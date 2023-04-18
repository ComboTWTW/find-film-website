import { auth } from "../config/firebase"

const Home = () => {

  return (
    <div>
      <button onClick={() => console.log(auth.currentUser && auth.currentUser.displayName)}>Name</button>
    </div>
  )
}

export default Home