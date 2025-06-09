import { useNavigate } from "react-router-dom"

const Test = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1>This is test bruh</h1>
        <button onClick={() => {
            navigate('/')
        }}>Press me</button>
    </div>
  )
}

export default Test
