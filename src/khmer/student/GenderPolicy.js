import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';

class GenderPolicy extends Component {
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
            englishPage: false,
            khmerPage: false
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
        this.setState({spanishPage: true, englishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, khmerPage: false})
    }

    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="អ្នកបកប្រែ"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !isAuthenticated() && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/khmer/signin' style={{color: 'black'}}>
                                    ចុះឈ្មោះ
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/khmer/signup' >
                                    ចុះឈ្មោះ
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        this.props.history.push('/khmer')
                                    })}>
                                      ផ្តាច់
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
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer'>ផ្ទះ</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link ><Link style={{color: 'white'}} to='/khmer/faculty'>មហាវិទ្យាល័យ</Link></Nav.Link>
                        </div>
                        <Nav.Link ><Link style={{color: 'white'}} to='/khmer/student'>និស្សិត</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/admission'>ការចូលរៀន</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/partners'>ដៃគូរបស់យើង</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/images'>វិចិត្រសាល</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmerevents'>ព្រឹត្តិការណ៍ជិតមកដល់</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }


    
    render() {
        const {spanishPage, englishPage, khmerPage } = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/student`} />
         } else if (englishPage) {
             return <Redirect to={'/student'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/student'} />
        }

        return (
            <div>
                {this.renderTopHeader()}
                {this.renderMenu()}
                <div className='container mt-4' >
                    <h3>សំណួរដែលសួរជាញឹកញាប់អំពីសិស្សានុសិស្សៈគោលនយោបាយសំរាប់យេនឌ័រនិងនិស្សិតប្តូរភេទដែលមានចំនួនច្រើន</h3>
                    <div>
                        <p>
                        តើពាក្យថា“ មនុស្សកែភេទ” មានន័យយ៉ាងដូចម្តេច?
                            “ ខ្ទើយ” គឺជាគុណនាមដែលពិពណ៌នាអំពីមនុស្សម្នាក់ដែលមានអត្តសញ្ញាណយេនឌ័រឬការបញ្ចេញមតិយេនឌ័រខុសគ្នាពីភេទនៅក្នុងមនុស្សនោះ។
                            សំបុត្រកំណើតដើម "អត្តសញ្ញាណយេនឌ័រ" គឺដូចជា sounds ពាក្យថាយេនឌ័រ (ភេទស្រីការរួមបញ្ចូលគ្នារវាងភេទឬយេនឌ័រ) ដែលមនុស្សម្នាក់ប្រើសម្រាប់ការកំណត់អត្តសញ្ញាណខ្លួនឯង។ "ការបញ្ចេញមតិយេនឌ័រ" គឺជារបៀបដែលមនុស្សនោះបង្ហាញពីភេទរបស់ពួកគេទៅកាន់អ្នកដទៃ។
                            ទាំងការស្លៀកពាក់អាកប្បកិរិយាឬសកម្មភាពផ្សេងទៀត។
                        </p>

                        <p>
                        ហេតុអ្វីបានជាមានគោលការណ៍ជាក់លាក់មួយសម្រាប់និស្សិតប្តូរភេទនិងពង្រីក?
                            សាលាសាធារណៈប្រូសេលប្តេជ្ញាបង្កើតបរិយាកាសប្រកបដោយសុវត្ថិភាពនិងរាប់បញ្ចូលសម្រាប់សិស្សទាំងអស់។ គោលការណ៍នេះពិពណ៌នាអំពីវិធីដែលសាលាអាចបង្កើតបាន
                            បរិយាកាសដែលនិស្សិតយេនឌ័រប្តូរភេទនិងពង្រីកមានអារម្មណ៍ស្រួលនិងគាំទ្រ។
                        </p>

                        <p>
                        តើអ្វីទៅជាវិធីសាស្រ្តស្រុកសម្រាប់សិស្សប្តូរភេទដោយប្រើបន្ទប់រៀននិងបន្ទប់ចាក់សោរ?
                            សាលាសាធារណៈ Providence អនុញ្ញាតឱ្យនិស្សិតប្តូរភេទជ្រើសរើសបន្ទប់ទឹកឬផ្លាស់ប្តូរទីតាំងរបស់ពួកគេយោងទៅតាមភេទ។
                            ជាមួយនឹងអ្វីដែលពួកគេបានកំណត់អត្តសញ្ញាណឬបង្ហាញខ្លួនពួកគេ។ និស្សិតដែលមិនកំណត់អត្តសញ្ញាណជាមួយនឹងភេទដែលត្រូវបានចាត់តាំងឱ្យពួកគេនៅពេលកើតនិងអ្នកដែលមានអារម្មណ៍មិនស្រួលនៅពេលជ្រើសរើសបុរសឬស្ត្រីដាច់ដោយឡែក
                            បន្ទប់ទឹកអាចស្នើសុំការប្រើប្រាស់បន្ទប់ទឹកឯកជន។ ស្រដៀងគ្នានេះដែរពួកគេអាចស្នើសុំការស្នាក់នៅក្នុងបន្ទប់ផ្លាស់ប្តូរដូចជាភាគថាសឬកាលវិភាគផ្លាស់ប្តូរដាច់ដោយឡែក។
                        </p>

                        <p>
                        តើក្រុមកីឡាអ្វីដែលនិស្សិតប្តូរភេទលេងនៅក្នុង?
                            និស្សិតកែភេទអាចជ្រើសរើសក្រុមអប់រំរាងកាយនិងរូបវិទ្យាដែលពួកគេចង់ចូលរួមដោយផ្អែកលើអត្តសញ្ញាណយេនឌ័រនិងការបញ្ចេញមតិរបស់ពួកគេ។ សិស្សចូលរួមក្នុងកីឡាអន្តរកីឡា។
                            អនុវត្តតាមច្បាប់នៃសម្ព័ន្ធរ៉ូដកោះអ៊ីនធ័ររីងធីង៖ http://www.riil.org/index.php/resources/rules-and-regulations/ ។
                        </p>

                        <p>
                        តើខ្ញុំអាចគាំទ្រនិស្សិតភេទទីបីនិងពង្រីកបានយ៉ាងដូចម្តេច?

គោរពជម្រើសរបស់អ្នករួមមានអត្តសញ្ញាណយេនឌ័រនិងការបង្ហាញយេនឌ័រនៃជម្រើសរបស់អ្នក។
ធ្វើតាមគំរូរបស់គាត់។ សូមយោងទៅលើសិស្សភេទនិងអ្នកប្តូរភេទដែលមានឈ្មោះនិងបញ្ចេញសំឡេងដូចគ្នាដែលពួកគេជ្រើសរើសដើម្បីកំណត់អត្តសញ្ញាណ។
ចង្អុលបង្ហាញពួកគេឱ្យគាំទ្រ។ ប្រសិនបើអ្នកស្គាល់សិស្សដែលកំពុងមានបទពិសោធន៍ឬពិចារណាអំពីការផ្លាស់ប្តូរយេនឌ័រត្រូវប្រាកដថាពួកគេដឹងថាមនុស្សពេញវ័យដែលទទួលការបណ្តុះបណ្តាលនិងយកចិត្តទុកដាក់ដែលត្រូវបានគេស្គាល់ថាជាក្រុមពិន្ទុនិស្សិតប្តូរភេទនិងមានមានសម្រាប់ពួកគេនៅសាលារបស់ពួកគេ។
</p>

<p>
ប្រសិនបើអ្នកជាអ្នកប្តូរភេទឬនិស្សិតយេនឌ័រដែលបានចុះឈ្មោះចូលរៀននៅសាលាប្រៃសណីយ៍សាធារណៈ
<h3> អ្នកសំរេចចិត្តថា៖ </h3>
ជាមួយអ្នកណាដែលអ្នកចង់ចែករំលែកអត្តសញ្ញាណនិងស្ថានភាពភេទរបស់អ្នក។
តើឈ្មោះអ្វីដែលត្រូវហៅអ្នកនិងសព្វនាមអ្វីដែលត្រូវប្រើសម្រាប់អ្នក។ ឈ្មោះដែលអ្នកជ្រើសរើសដើម្បីហៅមិនចាំបាច់ត្រូវនឹងឈ្មោះនៅលើសំបុត្រកំណើតរបស់អ្នកទេ។
តើបន្ទប់ទឹកឬតុរប្យួរខោអាវដែលអ្នកចង់ប្រើ។ អ្នកក៏អាចស្នើសុំជម្រើសដែលមានផាសុកភាពដូចជាភាគថាសឬកាលវិភាគផ្លាស់ប្តូរដាច់ដោយឡែកឬចូលបន្ទប់ទឹកបន្ទប់ទឹកឯកជន។
តើក្រុមអប់រំកាយនិងរូបវិទ្យាណាដែលអ្នកចង់ចូលរួមដោយមិនគិតពីភេទ។ ប្រសិនបើអ្នកចូលរួមប្រកួតកីឡាបែបអន្តរទ្វីបអ្នកត្រូវតែអនុវត្តតាមច្បាប់នៃសម្ព័ន្ធអឹមស៊ីសធីអេជអរអេសអិលៈ http://www.riil.org/index.php/resources/rules-and-regulations/ ។
                        </p>
                        <p>
                        អ្នកអាចសួរ៖
                            ដើម្បីទទួលបានការគាំទ្រពីក្រុមពិន្ទុសិស្សប្តូរភេទនិងពង្រីកនៃសាលារៀនរបស់អ្នកនៅពេលណាមួយដែលអ្នកត្រូវការប្រសិនបើអ្នកមានបទពិសោធន៍ឬមានគម្រោងឆ្លងកាត់ការផ្លាស់ប្តូរភេទសមាជិកក្រុមអាចបង្កើតការគាំទ្រផ្ទាល់ខ្លួនសម្រាប់អ្នកហើយប្រសិនបើអាចអនុវត្តបាន។ គ្រួសាររបស់គាត់
                        </p>

                        <p>
                            រាយការណ៍ជានិច្ច៖

                            ការគំរាមកំហែងការយាយីនិងឧប្បត្តិហេតុការរើសអើងមិនថាជាការដាក់អ្នកឬនិស្សិតផ្សេងទៀតទេ។
                            ទាំងនេះនឹងត្រូវបានយកចិត្តទុកដាក់និងដោះស្រាយឱ្យបានម៉ឺងម៉ាត់ស្របតាមលក្ខណៈនៃគោលការណ៍ក្រុមប្រឹក្សាភិបាលនិងច្បាប់។
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenderPolicy;