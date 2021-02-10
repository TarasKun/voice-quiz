import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '30px, 30px',
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
    spinner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
}));