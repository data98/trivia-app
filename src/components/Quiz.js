import Question from './Question.js';
import { v4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Quiz = () => {
    const [quizData, setQuizData] = useState([])
    const [showAnswers, setShowAnswers] = useState(false)
    const [quizReset, setQuizReset] = useState(0)

    let amountOfQuestions = 5;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://opentdb.com/api.php?amount=${amountOfQuestions}`);
                
                setQuizData(() => {
                    return response.data.results.map(question => {
                        
                        // incorrect obj init
                        const incorrect = question.incorrect_answers.map(answer => {
                            return {value: answer, id: v4(), isHeld: false, isCorrect: false};
                        });
                        
                        // correct obj init
                        const correct = {value: question.correct_answer, id: v4(), isHeld: false, isCorrect: true};
                        
                        // answers arr init
                        let allAnswersArr = [...incorrect];
                        const randomNum = Math.floor(Math.random() * 4);
                        allAnswersArr.splice(randomNum, 0, correct);

                        // T/F AnswersArr logic 
                        if(question.type === 'boolean') {
                            correct.value === 'True'
                            ? allAnswersArr = [correct, incorrect[0]]
                            : allAnswersArr = [incorrect[0], correct]   
                        }
                        
                        // return
                        return {...question, allAnswers: allAnswersArr, id: v4()}; 
                    });
                });

            } catch (error) {
                console.log(error)
            }
        })()
    }, [amountOfQuestions, quizReset]) 

    // qId (question) and aID (answer) match the correct answer and update held
    // aID is made in Question.js with .map(_, _.id)
    function updateHeld(qID, aID) {
        setQuizData(prevQuizData => {
            return prevQuizData.map(question => { // when choosing the answer we search for the question 
                if(qID !== question.id) { // question we dont want 
                    return question;
                } else { // question we want to change props to
                    const newAnswers = question.allAnswers.map(answer => { // going through answers
                        return answer.id === aID 
                            ? {...answer, isHeld: !answer.isHeld} // adding style to others
                            : {...answer, isHeld: false}; // removing style from others
                    });
                    
                    return {...question, allAnswers: newAnswers}; // setting just initialized arr
                }
            });
        });
    }

    const checkAnswers = () => {
        setShowAnswers(true)
    }

    const reset = () => {
        setShowAnswers(false)
        setQuizReset(prev => prev + 1)
    }

    let score = 0;
    if(showAnswers){
        quizData.map((question) => {
            return question.allAnswers.forEach(answer => {
                return answer.isHeld && answer.isCorrect ? score++ : score;
            });
        });
    }

    const questionElements = quizData.map((question, idx) =>
        <Question 
            key={v4()}
            qID={question.id}
            category={question.category}
            difficulty={question.difficulty}
            question={question.question}
            allAnswers={question.allAnswers}
            updateHeld={updateHeld}
            showAnswers={showAnswers}
        />
    );
    
    const buttonElements = !showAnswers 
    ? 
    <div className="footer center">
        <button 
            className="btn check-answers-btn" 
            onClick={checkAnswers}
        >Check Answers</button>
    </div>
    :
    <div className="footer footer-finished center">
        <p className="footer-text">
            {`You scored ${score}/${amountOfQuestions} answers`}
        </p>
        <button 
            className="btn play-again-btn" 
            onClick={reset}
        >
            Play Again
        </button>
    </div>;  

    return (
        <div className="quiz-container center">
            <div className="quiz-questions">
                {questionElements} 
                {buttonElements}
            </div>
        </div>
    )
}

export default Quiz;