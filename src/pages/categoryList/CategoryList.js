import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import './categoryList.scss';
import AuthService from '../../services/auth';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';


function CategoryList(){
    const [categories, setCategories] = React.useState(null);
    const [filteredCategories, setFilteredCategories] = React.useState(null);
    const [post, setPost] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [user, setUser] = React.useState(null);

    React.useEffect(()=>{
        Wordpress.getpost(257).then((post)=>{
            setPost(post);
        });
        
        Wordpress.getCategories().then((categories)=>{
            const cats = categories.map(elm => {
                return {
                    id: elm.id,
                    title: elm.title.rendered
                };
            });
            setCategories(cats);
            setFilteredCategories(cats);
        })
        AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(AuthService.currentUser().uid)
        .once("value", (snapshot)=>{
            snapshot.forEach(function(snap) {
                const user = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(user)
            });
        })
    }, [])

    const doSearch = (e)=> {
        e.preventDefault();
        setFilteredCategories(categories.filter(cat=>cat.title.includes(search)));
    }

    return(
        filteredCategories && post && user?
        <div className="categoryPage">
            <Navigation/>
            <div className="content">
                <Header title={`Velkommen til din online træning, ${user.username}`}/>

                <div className="intro" dangerouslySetInnerHTML={ { __html: post.content.rendered } }></div>

                <div className="category-container">
                    <h1>Kategorier</h1>
                    <div className="search-container">
                    <form onSubmit={(e)=>doSearch(e)}>
                        <input id="searchbar" className="searchbar" placeholder="Søg i kategorier" value={search} onChange={e=>setSearch(e.target.value)}/>
                        <Button type="submit" value="søg"/>
                    </form>
                </div>
                    {filteredCategories.map((item, i) => {
                return (
                        <Link className="category item-triangle" to={`/categories/${item.id}/exercises`} key={i} >
                            <Button className="item" value={item.title}></Button>
                            <div className="triangle"></div>
                        </Link>
                         );
                    
                    })}

                </div>
                   
           
            </div>
        </div> : null
    )
}


export default CategoryList;