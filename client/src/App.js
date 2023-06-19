import React from "react";
import './main.css';
//https://hades-counter-server.onrender.com/counter
const Counter = (props) => {
    var name = props.name;
    var spent = props.spent;
    var total = props.total;
    var url = props.url;
    var i = props.i;
    const disableNewlines = (event) => {
        const keyCode = event.keyCode || event.which
        if (keyCode === 13) {
            event.returnValue = false
            if (event.preventDefault) event.preventDefault()
            props.enter(event.target.innerText, i)
        }
    }
    return(
        <div className="counterchild">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={require(`./imgs/${name}.png`)} className="counterimgs" alt = ":("></img>
                        </td>
                        <td></td><td></td>
                        <td className="infobody">
                            <a href = {url} target="_blank" rel="noreferrer"><b>{name}</b></a><br/>
                            <span className="counterform" role="textbox" contentEditable={true} onKeyPress={disableNewlines}>{spent}</span>/{total}<br/>
                            ({(spent/total*100).toFixed(2)}%)<br/>
                            <button index-key = {i} onClick={props.change}>+</button>
                            <button index-key = {i} onClick={props.change}>-</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) 
}

const App = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch("https://earthy-purple-novel.glitch.me/counter")
        .then(res => res.json())
        .then(json => setData(json.counter));
    }, []);
    const changeValue = (event) => {
        event.preventDefault()
        var val = 1;
        if(event.target.innerText === "-") val = -1;
        fetch("https://earthy-purple-novel.glitch.me/counter", {
            method: "post",
            headers: {
                "value": val,
                "index": event.target.getAttribute('index-key')
            },
        })
            .then(res => res.json())
            .then(json => setData(json.counter))
    }
    function enterValue(newValue, i) {
        fetch("https://earthy-purple-novel.glitch.me/counter", {
            method: "post",
            headers: {
                "value": newValue,
                "index": i
            },
        })
            .then(res => res.json())
            .then(json => setData(json.counter))
    }
    return (
        <div id="container">        
            <div id="counterparent">
                {data.map((item,i) => {return(<Counter i = {i} key= {i} name = {item.name} spent = {item.spent} total = {item.total} url = {item.url} change = {changeValue} enter = {enterValue}/>)})}
            </div>
        </div>
    );
}

export default App;
