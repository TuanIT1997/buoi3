const Form = ({addWork}) => {
    return(
        <form 
            onSubmit={addWork}
            className="card-4 container padding-16 margin-bottom"
        >
            <h3 className="text-green center"><b>Danh sách công việc</b></h3>
            <label>{"Nội dung công việc: "}</label> <br/>
            <input 
                className="input margin-bottom"
                type="text" 
                name="work" 
            />
            <input className="button block green" type="submit" value="Thêm vào danh sách" />
        </form>
    )
}
const ListItem = ({id,title,compelete,comFunc,deleteTodo}) => {
    return(
        <div className="container border-bottom margin-bottom">
            <p className="left">{title}</p>
            {
                compelete? 
                <button className="right button red" onClick={() => deleteTodo(id)}>Delete</button> : 
                <button className="right button green" onClick={() => comFunc(id)}>complete</button>
            }
        </div>
    )
}
const List = ({listWork,comFunc,deleteTodo}) => {
    return(
        <div className="card-4 container padding-16">
            <h4 className="text-green">Bảng công việc: </h4>
            {listWork.map( (work) => 
                <ListItem
                    key={work.id}
                    {...work} 
                    comFunc={comFunc}
                    deleteTodo={deleteTodo} 
                />
            )}
        </div>
    )
}
class TodoList extends React.Component{
    state = {
        listWork: []
    }
    addWork = (event) => {
        event.preventDefault()
        const input = event.target.elements.work.value.trim();
        event.target.elements.work.value = "";
        if (input.length > 0){
            this.setState((state) => {
                return {
                    listWork : [...state.listWork,{
                        id: Math.floor(9999*Math.random()),
                        title: input,
                        compelete: false
                    }]
                }
            })
        }
    }
    comFunc = (id) => {
        console.log(id);
        this.setState( (state) => {
            return {
                listWork: state.listWork.map( (work) => {
                    if(work.id === id) return {
                        ...work,
                        compelete: true
                    }
                    return work;
                })
            }
        })
    }
    deleteTodo = (id) => {
        this.setState( (state) => {
            return {
                listWork: state.listWork.filter( (work) => work.id !== id)
            }
        })
    }
    render(){
        return(
            <div 
                className="container content border padding-16"
                style={{maxWidth: 1000}}
            >
                <Form addWork={this.addWork}/>
                <List 
                    listWork={this.state.listWork}
                    comFunc={this.comFunc}
                    deleteTodo={this.deleteTodo}
                />
            </div>
        )
    }
}
ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
)