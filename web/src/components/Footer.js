import React, { PureComponent } from 'react'
import Component from '../core/Component'
import { renderResponsive } from '../utils/responsive'
import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List'
import { Icon } from 'rmwc/Icon'
import { Button } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'

export default class Footer extends Component {

  constructor (props) {
    super(props)
  }

  renderFooterSectionElement (element) {
    return (<ListItem key={element.id} style={{}}>
      <Button onClick={this.triggerEvent(element.id, {handler: element.link})} style={{color: this.props.theme.footerTintColor, textAlign: 'left'}}>
        { element.title }
      </Button>
    </ListItem>)
  }

  renderFooterSection (section) {
    return (<div key={`footerSection${section.id}`} style={{
      marginRight: '20px'
    }}>
      <List>
        <ListItem style={{marginLeft: '15px'}}>
          <ListItemText style={{color: this.props.theme.footerHeaderColor}}> {section.title} </ListItemText>
        </ListItem>
        { section.elements.map(element => this.renderFooterSectionElement(element)) }
      </List>
    </div>)
  }

  renderFooterSections () {
    return this.props.footer.sections.map(section => this.renderFooterSection(section))
  }

  renderFooterLegal (compact) {
    return (<div style={{display: 'flex',
      flex: '1',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '100vw',
      backgroundColor: this.props.theme.footerBottomColor,
      flexDirection: (compact ? 'row' : 'column')}}>
      <List style={{
        display: 'flex',
        flex: '1',
        alignSelf: 'centers',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <ListItem style={{color: this.props.theme.footerHeaderColor,
          alignSelf: 'center'
        }}>
          <ListItemText> {this.props.info.watermark} </ListItemText>
        </ListItem>
      </List>
      <List style={{
        display: 'flex',
        flex: '1',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <ListItem style={{marginRight: '20px', color: this.props.theme.footerHeaderColor,
          alignSelf: 'center'
        }}>
          <ListItemText> {this.props.info.copyright} </ListItemText>
        </ListItem>
      </List>
    </div>)
  }

  renderDefault () {
    return (<div style={{backgroundColor: this.props.theme.footerColor,
      minHeight: '80px',
      padding: '0px',
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'center',
      color: '#ECEFF1'}}>
      <div style={{
        backgroundColor: this.props.theme.footerColor,
        minHeight: '80px',
        padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'start',
        flexDirection: 'row',
        justifyContent: 'start',
        color: '#ECEFF1'
      }}>
        { this.renderFooterSections() }
      </div>
      { renderResponsive('footer-bottom', this.renderFooterLegal(), this.renderFooterLegal(true)) }
    </div>)
  }

  render () {
    return this.renderDefault()
  }

}
