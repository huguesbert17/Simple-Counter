import React, { useState } from "react";
import {SecondsCounter} from "./SecondsCounter"
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
	transition: all .3s cubic-bezier(0.8, 0.06, 0.25, 1);
	&.alerted{
		background-image: radial-gradient(circle, #ab0505, #c2004a, #bc158b, #924ec5, #1274eb);s
	}
	.inner{
		width: 500px;
		margin: auto;
	}
	h1{
		color: #fff;
		font-size: 10rem;
		font-family: 'Montserrat', sans-serif;
	}
`

const Settings = styled.div`
	width: 300px;
	position: absolute;
	padding: 10px 20px;
	background: #fff;
	border-radius: 10px;
	margin: auto;
	left: 50%;
	top: 10px;
	transform: translateX(-50%);
	.input-group-text{
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		font-size: .8rem;
	}
	input{
		text-align: right;
	}
`

//create your first component
const Home = () => {
	const[isPaused, setIsPaused] = useState(false),
		[alertHitted, setAlertHitted] = useState(false),
		[restart, setRestart] = useState(false),
		[alertAt, setAlertAt] = useState(110),
		[startSeconds, setStartSeconds] = useState(120)

	return (
		<Wrapper className={`text-center${alertHitted ? ' alerted' : ""}`} style={{height: "100vh"}}>
			<Settings>
				<div className="input-group input-group-sm">
					<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroup-sizing-sm">Start count from</span>
					</div>
					<input type="number" className="form-control" step={1} min={1} defaultValue={startSeconds} onChange={(e) => {
						setRestart(true)
						setStartSeconds(parseInt(e.target.value))
						setTimeout(()=> setRestart(false), 200)
					}}/>
				</div>
				<div className="form-group">
					<label htmlFor="alert" className="form-label text-start d-block mb-0 mt-3">Alert at {alertAt}</label>
					<input type="range" className="form-range" defaultValue={alertAt} onChange={(e) => setAlertAt(parseInt(e.target.value))} min={10} max={startSeconds-5} id="alert"/>
				</div>
				<div className="form-group mt-1">
					<div className="btn-group">
						<button className="btn btn-dark btn-sm" onClick={() => setIsPaused(!isPaused)}>{isPaused ? "Resume" : "Pause"}</button>
						<button type="button" className="btn btn-sm btn-secondary me-0 ms-0 ps-0 pe-0" disabled></button>
						<button className="btn btn-dark" onClick={() => {
							setRestart(true)
							setIsPaused(false)
							setTimeout(()=> setRestart(false), 200)
						}}>Reset</button>
					</div>
				</div>
			</Settings>
			<div className="inner">
				<SecondsCounter restart={restart} alertLimit={alertAt} alertHitted={(e) => setAlertHitted(e)} seconds={startSeconds} isPaused={isPaused}/>
				{isPaused && <span className="bg-warning p-2 rounded-2">Counter paused</span>}
			</div>
			<div className="p-absolute bottom-10 bg-warning p-2 rounded-0">Visit <a href="https://hugues.vighor.com" target="_blank">my portfolio</a> | <a href="https://vighor.com" target="_blank">company</a></div>
		</Wrapper>
	);
};

export default Home;
