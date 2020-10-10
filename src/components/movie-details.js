import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'


function MovieDetails(props){

    const [highlighted,setHighlighted ] = React.useState(-1);
   

    let mov = props.movie;


    const highlightRate = high => evt => {
        setHighlighted(high)
    }

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 8b6605324d5c4a8ed28d4cd87fb264f11abbec5d'
            },
            body: JSON.stringify({stars: rate +1})
          })
          .then(() => getDetails())
          .catch(err => console.log(err))

    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/` , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 8b6605324d5c4a8ed28d4cd87fb264f11abbec5d'
            },
          })
          .then(resp => resp.json())
          .then(resp => props.updateMovie(resp))
          .catch(err => console.log(err))

    }

    return (
        <React.Fragment>
        <div>
            {mov ? (
                    <div>
                        <h1> {mov.title }</h1>
                        <p> {mov.description} </p>
                        <FontAwesomeIcon icon={faStar} className={ mov.avg_rating > 1 ?'color1': ''}/> 
                        <FontAwesomeIcon icon={faStar} className={ mov.avg_rating > 2 ?'color1': ''}/> 
                        <FontAwesomeIcon icon={faStar} className={ mov.avg_rating > 0 ?'color1': ''} /> 
                        <FontAwesomeIcon icon={faStar} className={ mov.avg_rating > 3 ?'color1': ''}/> 
                        <FontAwesomeIcon icon={faStar} className={ mov.avg_rating > 4 ?'color1': ''}/> 
                        ({mov.no_of_ratings})
                        <div className="rate-container">
                            <h1>Rate it</h1>
                            {[...Array(5)].map( (e,i) => {
                                    return <FontAwesomeIcon 
                                                key={i} 
                                                icon={faStar} 
                                                className={highlighted > i - 1 ? 'color2':''}
                                                onMouseEnter={highlightRate(i)}
                                                onMouseLeave={highlightRate(-1)}
                                                onClick={rateClicked(i)}
                                    
                                    /> 
                                })}
                        </div>
                    </div>

                ): null
            }
        </div>
        </React.Fragment>
    )
}

export default MovieDetails;