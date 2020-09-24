import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';
import My from './panels/My'


const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
	MY: 'my',
}

const STORAGE_KEYS = {
	STATUS: 'status'
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.MY);
	const [fetchedUser, setUser] = useState(null);
	//const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackBar, setSnackBar] = useState(false);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const data = {};
			const storageData = await bridge.send('VKWebAppStorageGet',{
				keys: Object.values(STORAGE_KEYS)
			});
			storageData.keys.forEach( ({key,value}) => {
				try {
					data[key] = value ? JSON.parse(value) : {};
					switch (key)
					{
						case STORAGE_KEYS:
							if(data[key].hasSeenIntro)
							{
								setActivePanel(ROUTES.HOME);
								setUserHasSeenIntro(true);
							}
							break;
						default:
							break;
					}

				} catch (e) {
					setSnackBar(<Snackbar
						layout = 'vertical'
						onClose={()=>setSnackBar(null)}
						before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic--red)'}}>
							<Icon24Error fill='#fff' width='14' height='14'/></Avatar>}
						duration={900}
					>
						Проблема
					</Snackbar>);
				}
			})
			console.log(storageData);
			setUser(user);
			//setPopout(null);
		}
		fetchData();
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	const viewIntro = async function (){
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					setUserHasSeenIntro: true
				})
			});
			go(ROUTES.HOME);
		} catch (e) {
			setSnackBar(<Snackbar
				layout = 'vertical'
				onClose={()=>setSnackBar(null)}
				before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic--red)'}}>
					<Icon24Error fill='#fff' width='14' height='14'/></Avatar>}
				duration={900}
			>
				Проблема c отправкой
			</Snackbar>);
		}
	}
	const viewMy = function ()
	{
		go(ROUTES.MY);
	}

	return (
		//popout={popout}
		<View activePanel={activePanel} >
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={viewMy} snackbarError={snackBar}/>
			<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro} snackbarError={snackBar} userHasSeenIntro={userHasSeenIntro}/>
			<My id={ROUTES.MY}/>
		</View>
	);
}

export default App;

