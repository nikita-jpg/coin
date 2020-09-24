import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import './Сoin.scss';
import {Div, FixedLayout} from "@vkontakte/vkui";


class My extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFirstThrow: true,
            isRotation: false,
            thisSide: 'eagle',
            nextSide: 'eagle',
        }
    }

    getCoin()
    {
        if(this.state.thisSide === 'eagle')
            return (
                <div id="animUpDownId">
                <div  id="testId" className="coin">
                    <div className="coin__front_eagle"></div>
                    <div className="coin__edge">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                    </div>
                    <div className="coin__back_tail"></div>
                </div>
                </div>)
        else
            return (
                <div id="animUpDownId">
                <div  id="testId" className="coin">
                    <div className="coin__front_tail"></div>
                    <div className="coin__edge">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                    </div>
                    <div className="coin__back_eagle"></div>
                </div>
                </div>)
    }

    getAnim()
    {
        if(this.state.thisSide === this.state.nextSide)
            return "anim360"
        else
            return "anim180"
    }

    getNextSide()
    {
        if( (Math.floor(Math.random() * 2)) === 1)
            return 'eagle';
        else
            return 'tail'
    }

    clickRotation()
    {
        if(this.state.isFirstThrow) {
            document.getElementById('testId').classList.add(this.getAnim());
            document.getElementById('animUpDownId').classList.add("animUpDown");
        }

        document.getElementById('testId').classList.remove(this.getAnim());
        document.getElementById('animUpDownId').classList.remove("animUpDown");
        setTimeout(() =>{
            document.getElementById('animUpDownId').classList.add("animUpDown");
            document.getElementById('testId').classList.add(this.getAnim());
        }, 0);

        this.setState(
            {
                isFirstThrow: false,
                isRotation: true,
                thisSide: this.state.nextSide,
                nextSide: this.getNextSide(),
            }
        )
    }


    render()
    {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>My</PanelHeader>
                <FixedLayout vertical='bottom'>
                    {this.getCoin()}
                    <Button mode='commerce' size='xl' onClick = {() => this.clickRotation()}>
                        Подбросить
                    </Button>
                </FixedLayout>
            </Panel>)
    }
}


My.propsType = {
    id: PropTypes.string.isRequired,
};

export default My;