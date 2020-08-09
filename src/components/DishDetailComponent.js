import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader } from 'reactstrap'



class DishDetail extends React.Component {

    constructor(props){
        super(props);
    }

    renderDish(dish){
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    }

    formatDate(dateStr){
        let date = new Date(dateStr)
        let options = {year: 'numeric', month: 'short', day: 'numeric'}
        return date.toLocaleDateString("en-US", options)
    }

    renderComments(comments){
        if (comments != null){
            const comment = comments.map((comment) =>{
                // let date = this.formatDate(comment.date);
                return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comment}
                    </ul>
                </div>
            );
        } else {
            return <div></div>
        }
    }

    render(){
        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>

            );
        } else{
            return <div></div>
        }
    }
}

export default DishDetail;