import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {platform, IOS, Group, Div, Avatar, FixedLayout, Button} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import './Intro.css';

const osName = platform();

const Intro = ({id, snackbarError,userHasSeenIntro,fetchedUser,go}) => {
	return(
		<Panel id={id} centered={true}>
			<PanelHeader>
				Арррр
			</PanelHeader>
			{(!userHasSeenIntro && fetchedUser) &&
			<Fragment>
				<Group>
					<Div classname = 'User'>
						{fetchedUser.photo_200 && <Avatar src = {fetchedUser.photo_200}/>}
						<h2>Привет, {fetchedUser.first_name} !</h2>
						<h3>Это тестовый сервис</h3>
					</Div>
				</Group>
				<FixedLayout vertical='bottom'>
					<Div>
						<Button mode='commerce' size='xl' onClick={go} >
							Ок
						</Button>
					</Div>
				</FixedLayout>
			</Fragment>
			}
			{snackbarError}
		</Panel>
	)
};

Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Intro;
