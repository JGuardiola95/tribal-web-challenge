import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'

export default function Main () {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={ Home }/>
      </Switch>
    </main>
  )
}