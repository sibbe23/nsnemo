import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

function dasboard() {

    
  return (
    
    <Container className='g-0' fluid>
<Header user='jalal'/>
<Row>
<Sidebar/>
</Row>


    </Container>
  )
}

export default dasboard