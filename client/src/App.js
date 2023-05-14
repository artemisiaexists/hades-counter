import React from "react";
import './main.css';

const Counter = (props) => {
    var name = props.name;
    var spent = props.spent;
    var total = props.total;
    var url = props.url;
    var i = props.i;
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
                            {spent}/{total}<br/>
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

const Shopper = () => {
    const wares = ["gemstones", "chthonic keys", "nectar", "diamond", "ambrosia", "titan blood"]
    const warePrices = [0, 0, 0, 0, 0, 0]
    const calculator = (event) => {
        var zeroes = false;
        var index = event.target.id;
        var unitsSI = event.target.value;
        if(index > 0) unitsSI *= 10;
        if(index > 1) unitsSI *= 5;
        if(index > 2) unitsSI *= 10;
        if(index > 3) unitsSI *= 2;
        warePrices[0] = unitsSI;
        warePrices[1] = Math.floor(unitsSI / 10);
        warePrices[2] = Math.floor(warePrices[1] / 5);
        warePrices[3] = Math.floor(warePrices[2] / 10);
        warePrices[4] = Math.floor(warePrices[3] / 2);
        warePrices[5] = Math.floor(warePrices[4]);
        warePrices[index] = event.target.value;
    }
    const handleEnter = (event) => {
        event.preventDefault()
        const allForms = event.target.parentElement.parentElement.children;
        console.log(allForms)
        for(let i = 1; i < allForms.length; i++) {
            var formTextBox = allForms[i].children[0].children[0]
            formTextBox.value = warePrices[i-1];
        }
    }

    return(
        <div id="calculator">
            <b>price calculator!</b>
            {wares.map((item,i) => {return(<Ware name = {item} key = {i} index = {i} function = {calculator} price = {warePrices[i]} enter = {handleEnter}/>)})}
        </div>
        
    )
}

const Ware = (props) => {
    return(
        <div>
            <form onSubmit={props.enter}> 
                <input onChange={props.function} id={props.index} className = "calculatorform"/>
                <span> </span> <img src={require(`./imgs/${props.name}.png`)} className="calculatorimgs" alt = ":("></img>
                <span> </span> {props.name}
            </form>
        </div>
    )
}

const App = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch("https://hades-counter-server.onrender.com/counter")
        .then(res => res.json())
        .then(json => setData(json.counter));
    }, []);
    const changeValue = (event) => {
        event.preventDefault()
        var val = 1;
        if(event.target.innerText === "-") val = -1;
        fetch("https://hades-counter-server.onrender.com/counter", {
            method: "post",
            headers: {
                "value": val,
                "index": event.target.getAttribute('index-key')
            },
        })
            .then(res => res.json())
            .then(json => setData(json.counter))
            //setData(json.counter)
    }
    return (
        <div id="container">        
            <div id="counterparent">
                {data.map((item,i) => {return(<Counter i = {i} key= {i} name = {item.name} spent = {item.spent} total = {item.total} url = {item.url} change = {changeValue}/>)})}
            </div>
            <pre></pre>
            <div id="shopprices">
                <Shopper/>
            </div>
        </div>
    );
}

export default App;
