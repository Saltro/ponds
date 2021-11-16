import React, {Component, lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {TaskPanel} from "../../../views/TaskPanel";
import Loading from '../../../views/Loading'
import './index.css'

const QuadrantPanel = lazy(() => import('../../../views/QuadrantPanel'))
const AnalysisPanel = lazy(() => import('../../../views/AnalysisPanel'))

export default class Container extends Component {
  render() {
    return (
      <div id="container">
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path="/task" component={TaskPanel}/>
            <Route path="/quadrant" component={QuadrantPanel}/>
            <Route path="/analysis" component={AnalysisPanel}/>
            <Redirect to="/task"/>
          </Switch>
        </Suspense>
      </div>
    );
  }
}
