import { useNavigate } from "react-router-dom"

const Index = () => {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Hello there!</h1>
              <button onClick={() => {
                navigate('test')
        }}>Press me</button>
    </div>
  )
}

export default Index
