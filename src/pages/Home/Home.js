import React from 'react'
import SearchService from '../../services/SearchService/SearchService'
import Search from '../../components/Common/Search'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'

export default class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      term: '',
      searchResult: [],
      resultCount: null,
      errorSnackBar: false
    }
  }

  handleTerm = (event) => {
    this.setState({
      term: event.target.value
    })
  }

  closeDialog = () => {
    this.setState({ openDialog: false})
  }

  search = () => {
    let payload = {
      term: this.state.term
    }
    this.setState({loading: true})
    SearchService.search(payload).then((res) => {
      console.log('RES', res)
      this.setState({searchResult: res.results})
      this.setState({loading: false})
    }).catch(err => {
      console.log('THERE WAS AN ERROR', err)
      this.setState({loading: false, errorSnackBar: true})
    })
  }

  render () {
    const { errorSnackBar } = this.state
    return (
      <div>
        <h2> Buscar </h2>
        <div className="form-style">
          <Box justifyContent="center">

          </Box>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
             <Search data={this.state.searchResult} />
          </Box>
        </div>
        <Snackbar open={errorSnackBar} autoHideDuration={6000} >
          <Alert severity="error">
            Hubo un error!
          </Alert>
        </Snackbar>
      </div>
    )
  }
}