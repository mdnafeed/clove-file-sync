import { connect } from 'mongoose';

connect('mongodb://localhost:27017')
.then(()=>{
    console.log('db connection successfully')
}).catch(()=>{
    console.log('failed to db connection')
})