import {Component} from 'react';
import { Row, Col,Image,Tabs, Space} from 'antd';
import styled from "@emotion/styled";
import './index.css'
import Logo from '../../assets/LOGO.png'
import Task from '../../assets/Task Pools.png'
import Login from './component/Login'
import Register from './component/Register';


const {TabPane}  = Tabs;


function callback(key) {
  console.log(key);
}

class Identity extends Component{
  render(){
    return (
      <Container>
      <div className="container">
        <div style={{width:'100%'}}>
        <Row align="middle" justify="center">
         <Col span={24} style={{display:'flex', justifyContent:'center'}}>
     
               <div className="img-left"/>
               <div style={{position:'relative', width:'360px'}}>
                <div style={{marginTop:'-80px'}}>
                   <Space size="middle">
                    <Image
                        width={120}
                        src={Logo}
                        preview={false}
                      />
                        <Image
                        width={222}
                        src={Task}
                        preview={false}
                      />
                   </Space>
                  </div>
                  <div style={{width:'360px',height:'284px',position:'absolute', top:'calc(50% - 142px)'}}>
                    <Tabs defaultActiveKey="1" onChange={callback} animated >
                      <TabPane tab="Login" key="1">
                          <Login/>
                      </TabPane>
                      <TabPane tab="Sign Up" key="2">
                      <Register/>
                      </TabPane>
                    </Tabs>
                  </div>
               </div>
               
         </Col>
         </Row>
        </div>
      </div>
      </Container>
    );
  }
}


const Container = styled.div`
  display:flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
`

export default Identity;