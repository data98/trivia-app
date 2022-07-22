import he from 'he';

const Question = ({category, difficulty, question, updateHeld, allAnswers, qID, showAnswers}) => {

    const answerButtons = allAnswers.map((answer, idx) => {

        let styles = {
            backgroundColor: answer.isHeld ? '#D6DBF5'  : 'none',
            border: answer.isHeld ? 'none' : '0.8px solid #4D5B9E'
        } 

        if(showAnswers) {
            if(answer.isHeld && answer.isCorrect){
                styles = { background: '#94D7A2', border: 'none' };

            } else if (answer.isHeld && answer.isCorrect === false) {
                styles = { backgroundColor: '#F8BCBC', opacity: '50%', border: 'none' };

            } else if (answer.isCorrect) {
                styles = { backgroundColor: '#94D7A2', border: 'none' };

            } else if (answer.isCorrect === false) {
                styles = { opacity: '50%' };
            }
        }

        return (
            <button key={idx}
                className="answer"
                style={styles}
                onClick={() => updateHeld(qID, answer.id)}
            >
                {he.decode(answer.value)}
            </button>
        )
    })

    return (
        <div className="question">
            <div className="question-info">
                <p>{category}</p>
                <p>{difficulty}</p>
            </div>
            <h3>{he.decode(question)}</h3>

            <div className="answers">
                {answerButtons}
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question;