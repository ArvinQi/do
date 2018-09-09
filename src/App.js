import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Divider,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemIcon,
    Modal,
    GridList,
    GridListTile,
    GridListTileBar,
    TextField
} from '@material-ui/core';
import {
    Home as HomeIcon,
    ClearAll as ClearAllIcon,
    FiberManualRecord as DragIcon,
    Send as SendIcon,
    ChevronLeft as Chevronlefticon,
    ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@material-ui/icons';
import uuid from 'uuid';
import localforage from 'localforage';

const drawerWidth = 240;
const appBarHeight = 56;

class App extends Component {
    render() {
        const {classes, theme} = this.props;
        const {drawer, longTouch, positionX, positionY, addModal, do1, do2, do3, do4} = this.state;
        return (
            <div className={classes.root}>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={addModal}
                    onClose={this.handleAddClose}
                >
                    <div className={classes.addModal}>
                        <form className={classes.addForm} onSubmit={this.handleAdd} noValidate autoComplete="off">
                            <TextField
                            id="name"
                            label="Thing"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleAddFormChange('name')}
                            margin="normal"
                            autoFocus={true}
                            />
                            <div>
                                <Button className={classes.modalBtn} onClick={this.handleAddClose}>取消</Button>
                                <Button className={classes.modalBtn} type="submit" onClick={this.handleAdd}>添加</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <AppBar
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: drawer,
                    [classes[`appBarShift-left`]]: drawer
                })}
                    position="static">
                    <Toolbar>
                        <IconButton
                            onClick={this.toggleDrawer}
                            className={classNames(classes.menuButton, drawer && classes.hide)}
                            color="inherit"
                            aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            First Thing First
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={drawer}
                    onClose={this.toggleDrawer}
                    onOpen={this.toggleDrawer}
                    classes={{
                    paper: classes.drawerPaper
                }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.toggleDrawer}>
                            {theme.direction === 'rtl'
                                ? <ChevronRightIcon/>
                                : <Chevronlefticon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemIcon>
                                <ClearAllIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Clear"/>
                        </ListItem>
                        <ListItem button component="a" href="mailto:arvin.qi@qq.com">
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Tell me"/>
                        </ListItem>
                    </List>
                </SwipeableDrawer>
                <main className={classes.content}>
                    <IconButton onTouchMove={this.handleDrag} onTouchStart={this.handleDragStart} onTouchEnd={this.handleDragEnd} className={classNames(classes.dragBtn, {[classes.dragBtnHover]: longTouch})} style={{left: `${positionX}%`, top: `${positionY}%`}}>
                        <DragIcon className={classes.dragBtnIcon}/>
                    </IconButton>
                    <div className={classes.add} style={{left: `${positionX}%`, top: `${positionY}%`}}>
                        <Button onClick={this.handleAddFormOpen(1)} className={classes.addBtn}></Button>
                        <Button onClick={this.handleAddFormOpen(2)} className={classes.addBtn}></Button>
                        <Button onClick={this.handleAddFormOpen(3)} className={classes.addBtn}></Button>
                        <Button onClick={this.handleAddFormOpen(4)} className={classes.addBtn}></Button>
                    </div>
                    <GridList className={classes.gridList}>
                        <GridListTile className={classNames(classes.gridListTitle, classes.gridListTitle1)} style={{width: `${positionX}%`, height: `${positionY}%`}} key="1">
                        <List>
                            <ListSubheader>重要紧急</ListSubheader>
                            {do1.map(item => (<ListItem className={classNames({[classes.thingComplete]: item.complete})} onClick={this.handleComplete(item)} key={item.uuid}>{item.name}</ListItem>))}
                        </List>
                        </GridListTile>
                        <GridListTile className={classNames(classes.gridListTitle, classes.gridListTitle2)} style={{width: `${100 - positionX}%`, height: `${positionY}%`}} key="2">
                        <List>
                            <ListSubheader>重要不紧急</ListSubheader>
                            {do2.map(item => (<ListItem className={classNames({[classes.thingComplete]: item.complete})} onClick={this.handleComplete(item)} key={item.uuid}>{item.name}</ListItem>))}
                        </List>
                        </GridListTile>
                        <GridListTile className={classNames(classes.gridListTitle, classes.gridListTitle3)} style={{width: `${positionX}%`, height: `${100 - positionY}%`}} key="3">
                        <List>
                            <ListSubheader>不重要紧急</ListSubheader>
                            {do3.map(item => (<ListItem className={classNames({[classes.thingComplete]: item.complete})} onClick={this.handleComplete(item)} key={item.uuid}>{item.name}</ListItem>))}
                        </List>
                        </GridListTile>
                        <GridListTile className={classNames(classes.gridListTitle, classes.gridListTitle4)} style={{width: `${100 - positionX}%`, height: `${100 - positionY}%`}} key="4">
                        <List>
                            <ListSubheader>不重要不紧急</ListSubheader>
                            {do4.map(item => (<ListItem className={classNames({[classes.thingComplete]: item.complete})} onClick={this.handleComplete(item)} key={item.uuid}>{item.name}</ListItem>))}
                        </List>
                        </GridListTile>
                    </GridList>
                </main>
            </div>
        );
    }
    state = {
        drawer: false,
        positionX: 50,
        positionY: 50,
        longTouch: false,
        addModal: false,
        addType: null,
        addForm: {},
        do1: [],
        do2: [],
        do3: [],
        do4: []
    }
    componentDidMount() {
        for (let i = 1; i< 5; i++) {
            let store = `do${i}`;
            localforage.getItem(store).then(res => {
                if (!res) {
                    return;
                }
                this.setState({
                    [store]: res
                });
            });
        }
    }
    toggleDrawer = () => {
        this.setState({
            drawer: !this.state.drawer
        })
    }
    handleAddFormChange = name => e => {
        this.setState({
            addForm: {
                ...this.state.addForm,
                [name]: e.target.value
            }
        })
    }
    handleAddFormOpen = addType => e => {
        this.setState({
            addType,
            addModal: true
        });
    }
    handleAddClose = e => {
        this.setState({
            addModal: false,
            addType: null,
            addForm: {}
        })
    }
    handleAdd = e => {
        e.preventDefault();
        if (!this.state.addType || !this.state.addForm.name) {
            return;
        }
        let store = `do${this.state.addType}`;
        let addForm = {
            ...this.state.addForm,
            complete: false,
            type: store,
            uuid: uuid()
        }
        localforage.setItem(store, [...this.state[store], addForm]).then(res => {
            this.setState({
                addType: null,
                addForm: {},
                addModal: false,
                [store]: res
            })
        });
    }
    handleComplete = thing => e => {
        e.preventDefault();
        let store = this.state[thing.type];
        store = store.map(t => {
            if (t.uuid === thing.uuid) {
                t.complete = !t.complete;
            }
            return t
        });
        localforage.setItem(thing.type, store).then(res => {
            this.setState({
                [thing.type]: res
            });
        })
    }
    handleDelete = e => {
        e.preventDefault();
        for (let i = 1; i< 5; i++) {
            let storeName = `do${i}`;
            let store = this.state[storeName];
            store = store.map(t => {
                if (t.complete) {
                    return false;
                }
                return t;
            }).filter(t => t);
            localforage.setItem(storeName, store).then(res => {
                this.setState({
                    [storeName]: res
                });
            });
        }
        this.setState({
            drawer: false,
        });
    }
    handleDrag = e => {
        let touch;
        let screen = window.screen;
        if(e.touches){
            touch = e.touches[0];
        }else {
            touch = e;
        }
        let positionX = 100 * touch.clientX/screen.width;
        let positionY = 100 * (touch.clientY - appBarHeight)/(screen.height - appBarHeight);
        if (positionX < 20) {
            positionX = 20;
        }else if (positionX > 80) {
            positionX = 80;
        }
        if (positionY < 10) {
            positionY = 10;
        }else if (positionY > 90) {
            positionY = 90;
        }
        this.setState({
            positionX,
            positionY
        })
    }
    handleDragStart = () => {
        this.setState({longTouch: true});
    }
    handleDragEnd = () => {
        this.setState({longTouch: false});
    }
}
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
        background: '#00B8D4',
    },
    flex: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    appBar: {
        position: 'absolute',
        color: '#fff',
        // transition: theme
        //     .transitions
        //     .create([
        //         'margin', 'width'
        //     ], {
        //         easing: theme.transitions.easing.sharp,
        //         duration: theme.transitions.duration.leavingScreen
        //     })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        overflow: 'hidden',
        transition: theme
            .transitions
            .create([
                'margin', 'width'
            ], {
                easing: theme.transitions.easing.easing,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    'appBarShift-left': {
        marginLeft: drawerWidth
    },
    'appBarShift-right': {
        marginRight: drawerWidth
    },
    hide: {
        display: 'none'
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#00B8D4',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        position: 'relative',
        top: `${appBarHeight}px`,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    'content-left': {
        marginLeft: -drawerWidth
    },
    'content-right': {
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme
            .transitions
            .create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    'contentShift-left': {
        marginLeft: 0
    },
    gridList: {
        position: 'relative',
        width: '100vw',
        height: `calc(100vh - ${appBarHeight}px)`,
        cellHeight: '50%',
        overflow: 'hidden',
        justifyContent: 'space-around',
        background: '#ddd',
        margin: '0 !important'
    },
    gridListTitle: {
        overflow: 'hidden',
        '& ul': {
            minWidth: '50vw',
            overflow: 'scorll'
        },
        '& li:first-of-type': {
            color: '#424242',
            padding: '8px 16px',
            lineHeight: '1em',
        },
        '& li': {
            padding: '0 16px',
            color: '#FAFAFA',
        }
    },
    gridListTitle1: {
        background: '#00ACC1'
    },
    gridListTitle2: {
        background: '#0097A7'
    },
    gridListTitle3: {
        background: '#00838F'
    },
    gridListTitle4: {
        background: '#006064'
    },
    dragBtn: {
        position: 'absolute',
        width: '2rem',
        height: '2rem',
        marginLeft: '-1rem',
        marginTop: '-1rem',
        transition: 'transform .3s ease-in-out',
        color: '#B2EBF2',
        fontSize: '24px',
        opacity: '.6',
        borderRadius: '2rem',
        overflow: 'hidden',
        zIndex: 101,
        // '&:hover': {
            // transform: 'scale(1.5)'
        // }
    },
    dragBtnIcon: {
        width: '2rem',
        height: '2rem'
    },
    dragBtnHover: {
        transform: 'scale(2.5)'
    },
    add: {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        width: '6rem',
        height: '6rem',
        marginLeft: '-3rem',
        marginTop: '-3rem',
        borderRadius: '3rem',
        overflow: 'hidden',
        zIndex: 100
    },
    addBtn: {
        minWidth: '3rem',
        minHeight: '3rem',
        padding: '0 0',
        margin: '0 0',
        background: '#B2EBF2',
        opacity: '.3',
        transition: 'opacity .3s ease-in',
        '&:hover': {
            // transform: 'scale(1.1)',
            opacity: '0.6',
            background: '#B2EBF2'
        },
    },
    addModal: {
        position: 'relative',
        top: `${appBarHeight}px`,
        padding: '0 32px',
        background: '#B2EBF2',
        opacity: .8
    },
    modalBtn: {
        width: '50%',
        color: '#004D40',
        textAlign: 'center'
    },
    textField: {
        width: '100%',
    },
    thingComplete: {
        textDecoration: 'line-through',
        color: '#616161 !important'
    }
});
App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};
export default withStyles(styles, {withTheme: true})(App);
