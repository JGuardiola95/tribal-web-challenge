import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchService from '../../services/SearchService/SearchService'
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TvIcon from '@material-ui/icons/Tv';
import MovieIcon from '@material-ui/icons/Movie';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      term: '',
      options: [{
        service: '',
        type: '',
        name: '',
        url: ''
      }],
      resultCount: null,
      errorSnackBar: false
    }
    this.servicesValue = _.debounce(this.servicesValue, 500);
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  servicesValue = async (e) => {
    console.log('EVENT', e)
    this.setState({term: e})
    const response = await SearchService.search({term: e})
    const result = response.results;

    if (result) {
      this.setState({options: Object.keys(result).map((key) => result[key])});
    }
  }

  handleChange = (event) => {
    this.servicesValue(event)
  }

  render () {
    return (
      <Autocomplete
        id="search-component"
        style={{ width: 300 }}
        open={this.state.open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={this.state.options}
        loading={this.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar..."
            variant="outlined"
            value={this.term}
            onChange={(e) => this.handleChange(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              {option.type === 'person'
              ? <EmojiPeopleIcon /> : option.type === 'song'
              ? <MusicNoteIcon /> : option.type === 'feature-movie'
              ? <MovieIcon /> : option.type === 'show' ? <TvIcon /> : ''}
            </Grid>
            <Grid item xs>
              {option.name}
              <Typography variant="body2" color="textSecondary">
                {option.service}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
      />
    );
  }
}