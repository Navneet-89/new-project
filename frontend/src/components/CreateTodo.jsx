import './CreateTodo.css'

export function CreateTodo(){
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <input type="text" placeholder="title" className="inpt"></input>
        <br/>
        <input type="text" placeholder="description" className='inpt'></input>
        <br/>
        <button className='btn' onClick={()=>{
            fetch("http://localhost:3000/todos",
                {method: "Post",
                    body: {
                        title: title,
                        description: description
                    }
                }
            ) 
                .then(async function(res){
                    const json = await res.json();
                    alert("Todo added");
                })
        }}>Add a Todo</button>
    </div>
};