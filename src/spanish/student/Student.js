import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import Links from './Links'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';


class Student extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
            spanishPage: false,
            englishPage: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true})
    }

    translateEnglish = () => {
        this.setState({englishPage: true})
    }

    renderTopHeader = () => {
        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="Traductora"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a >Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !isAuthenticated() && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/signin' style={{color: 'black'}}>
                                    Registrarse
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/signup' >
                                    Regístrate
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        this.props.history.push('/spanish/images')
                                    })}>
                                      Desconectar
                                    </a>
                                </Nav.Link>
                            )
                        }
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderMenu = () => {
        return (
            <div>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish'>Hogar</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link ><Link style={{color: 'white'}} to='/spanish/faculty'>Facultad</Link></Nav.Link>
                        </div>
                        <Nav.Link ><Link style={{color: 'white'}} to='/spanish/student'>Estudiantes</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/admission'>Admisión</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/partners'>Nuestros compañeros</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/images'>Galería</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanishevents'>Próximos Eventos</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
    
    render() {
        const {spanishPage, englishPage } = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/student`} />
         } else if (englishPage) {
             return <Redirect to={'/student'} />
         }

        return (
            <div>
                {this.renderTopHeader()}
                {this.renderMenu()}
                <div className='container' >
                    <h3 className='text-center'>Bienvenido a nuestra sección de estudiantes</h3>
                    <p className='text-center'>A continuación encontrará una lista de contenido sobre nuestras políticas y otros enlaces importantes que creemos que beneficiarán a nuestros estudiantes.</p>
                <ul>
                    <li>
                        <Link to='/spanish/bully'>
                                Política de intimidación
                        </Link>
                    </li>

                    <li>
                        <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                                Manual de intimidación
                        </Link>
                    </li>

                    <li>
                        <Link to='/spanish/genderpolicy'>
                                Política de género estudiantil
                        </Link>
                    </li>
                    
                    
                </ul>
                <Links />
                </div>
            </div>
        );
    }
}

export default Student;