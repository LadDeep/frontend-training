import { useNavigate } from "react-router-dom"
import Profile from "../components/Profile";

const Home = (props) => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        props.logOut();
        navigate('/login');
    }
    return (
        <div className="col-2">
            <div className="content">
                <h1 className="heading">Home Page</h1>
                
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium provident similique cum incidunt laboriosam dicta modi excepturi enim, ut blanditiis voluptatem qui sapiente quasi dolores dolore laborum natus velit cupiditate atque at itaque! Asperiores id voluptates totam sunt saepe quos reiciendis dolorem vero necessitatibus ab? Delectus, reprehenderit nisi. Ex aperiam illum numquam dolore nihil itaque vel laborum mollitia sit laudantium recusandae distinctio possimus, nemo commodi nam perspiciatis. Aperiam corrupti reiciendis perspiciatis illum. Delectus nesciunt iusto ex accusamus dolor ut officia doloribus aliquam labore sed enim, aliquid iste facere fuga commodi distinctio inventore quo, sequi nam accusantium asperiores rem a. Quasi.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium provident similique cum incidunt laboriosam dicta modi excepturi enim, ut blanditiis voluptatem qui sapiente quasi dolores dolore laborum natus velit cupiditate atque at itaque! Asperiores id voluptates totam sunt saepe quos reiciendis dolorem vero necessitatibus ab? Delectus, reprehenderit nisi. Ex aperiam illum numquam dolore nihil itaque vel laborum mollitia sit laudantium recusandae distinctio possimus, nemo commodi nam perspiciatis. Aperiam corrupti reiciendis perspiciatis illum. Delectus nesciunt iusto ex accusamus dolor ut officia doloribus aliquam labore sed enim, aliquid iste facere fuga commodi distinctio inventore quo, sequi nam accusantium asperiores rem a. Quasi.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium provident similique cum incidunt laboriosam dicta modi excepturi enim, ut blanditiis voluptatem qui sapiente quasi dolores dolore laborum natus velit cupiditate atque at itaque! Asperiores id voluptates totam sunt saepe quos reiciendis dolorem vero necessitatibus ab? Delectus, reprehenderit nisi. Ex aperiam illum numquam dolore nihil itaque vel laborum mollitia sit laudantium recusandae distinctio possimus, nemo commodi nam perspiciatis. Aperiam corrupti reiciendis perspiciatis illum. Delectus nesciunt iusto ex accusamus dolor ut officia doloribus aliquam labore sed enim, aliquid iste facere fuga commodi distinctio inventore quo, sequi nam accusantium asperiores rem a. Quasi.</p>
                <p>Excepturi laudantium officiis quae fugiat autem facere alias assumenda quia, voluptatibus vel inventore ratione, molestias dolorem enim aperiam, eaque minima cumque veritatis magni minus voluptate sapiente. Sapiente quibusdam neque mollitia doloribus esse accusantium nostrum architecto officia. Natus alias earum id deleniti, mollitia explicabo eaque ipsum minima consequuntur aperiam soluta nesciunt ullam esse odit expedita quasi inventore, quo impedit. Cum cumque consectetur rem quasi recusandae ad molestiae, pariatur officia soluta sit repudiandae et ab earum nihil vel illum beatae dicta harum commodi, fuga rerum nobis voluptatem. Velit alias optio, accusamus beatae soluta assumenda voluptatum quasi odit mollitia corporis natus, adipisci itaque.</p>
            </div>
            <div className="user-profile">
                <Profile user={props.userData}/>
                <button className="btn" type="button" onClick={handleLogout}>Logout</button>      
            </div>

        </div>
    )
}

export default Home
