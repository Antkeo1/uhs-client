import React, {Component} from 'react'
import { singleCarousel, update } from './apiCarousel';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditCarousel extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            caption1: "",
            missionStatement: "",
            redirectToHome: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (carouselId) => {
        singleCarousel(carouselId).then(data => {
            if (data.error) {
                this.setState({redirectToHome: true})
            } else {
                this.setState({id: data._id, missionStatement: data.missionStatement, error: ''})
            }
        })
    }

    componentDidMount() {
        this.carouselData = new FormData()
        const carouselId = this.props.match.params.carouselId
        this.init(carouselId)
    }

    isValid = () => {
        const { missionStatement, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.carouselData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const carouselId = this.state.id
            const token = isAuthenticated().token;

            update(carouselId, token, this.carouselData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        caption1: "",
                        missionStatement: '',
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editCarouselForm = (caption1, missionStatement) => (
        <form className='container'>

            <div className="form-group">
                <label className="text-muted">Estado de la misión</label>
                <textarea
                    style={{height:'100px'}}
                    onChange={this.handleChange("missionStatement")}
                    type="text"
                    className="form-control"
                    value={missionStatement}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Editar
            </button>
        </form>
    );


    render() {
        const {id, caption1, missionStatement, redirectToHome, error, loading} = this.state

        if (redirectToHome) {
            return <Redirect to={`/spanish`} />;
        }

        return (
            <div>
              
                        <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                            {error}
                        </div>

                        {loading ? ( 
                        <div className='jumbotron text-center'>
                            <h2>Cargando....</h2>
                        </div>
                        ) : (
                            ""
                        )
                    }


                        {this.editCarouselForm(id, missionStatement)}
             
            </div>
        )
    }
}

export default EditCarousel