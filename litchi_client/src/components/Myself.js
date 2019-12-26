import React ,{useState} from 'react'
function Myself() {
    const [age ,setAge] = useState(19)
    const [sex ,setSex] = useState('男')
    const [work ,setWork] = useState('student')

    return (
        <div>
            <p>年龄：{age}</p>
            <p>性别：{sex}</p>
            <p>工作：{work}</p>
        </div>
    )
}
export default Myself