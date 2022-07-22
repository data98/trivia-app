const Welcome = (props) => { 
    return (
    <div className="prelogue card center">
        <div className="card-contents">
            <h1>Quizzical</h1>
            <p>Guess as many answers as possible</p>
            <button 
            className="btn btn-first" 
            onClick={props.getStarted}
            >
            Start quiz
            </button>
        </div>
    </div>
    )
}

export default Welcome;