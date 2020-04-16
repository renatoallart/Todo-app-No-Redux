import React ,{ Component } from "react"
import axios from 'axios'

import PageHeader from "../template/pageHeader"
import Form from './todoForm'
import List from './todoList'

const URL ='http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor (pros){
        super(pros)

        this.state = {description: '', list: []}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        

        this.reflesh()
    }

    reflesh( description=''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description,list : resp.data}))
    }

    handleSearch(){
        this.reflesh(this.state.description)
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
            .then(resp => this.reflesh())
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})

    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.reflesh(this.state.description))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done : true})
        .then(resp => this.reflesh(this.state.description))
    }

    
    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done : false})
        .then(resp => this.reflesh(this.state.description))
    }

    handleClear(){
        this.reflesh()
    }

    render(){

        return(
            <div>
                <PageHeader name='Task' small='register'/>
                <Form description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>
                <List list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
            
        )
    }
}
 