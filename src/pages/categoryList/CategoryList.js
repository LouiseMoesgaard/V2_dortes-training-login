import React from 'react';
import Navigation from '../../components/navigation/navigation.js';
import './categoryList.scss';
import AuthService from '../../services/auth';
import Wordpress from '../../services/wordpress';
import Header from '../../components/header/header';
import Button from '../../components/button/button.js';
import {Link} from 'react-router-dom';
import Loader from '../../components/loader/loader.js';


function CategoryList({user}){
    const [categories, setCategories] = React.useState(null);
    const [filteredCategories, setFilteredCategories] = React.useState(null);
    const [post, setPost] = React.useState(null);

    React.useEffect(()=>{
        Wordpress.getpost(412).then((post)=>{
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
        
    }, [])

    const doSearch = (e)=> {
        if(e.target.value.length === 0){
            setFilteredCategories(categories);
        } else {
        setFilteredCategories(categories.filter(cat=>cat.title.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    return(
        filteredCategories && post?
        <div className="categoryPage">
            <Navigation/>
            <div className="content content-mobil">
            <div className="mobil-box">
                <Header title={`Velkommen til din online træning, ${user.username}`}/>

                <div className="intro">
                    <div className="d-grid">
                    <div className="bluebox" dangerouslySetInnerHTML={ { __html: post.tekst } }></div>
                    <img src={post.billede.guid} alt={post.billede.post_name}/>
                    </div>
                </div>
            </div>
             

                <div className="category-container">
                    <h1>Kategorier</h1>
                    <div className="search-container">
                    <form>
                        <input id="searchbar" className="searchbar" placeholder="Søg i kategorier" onChange={e=>doSearch(e)}/>
                    </form>
                </div>
                <div className="categories-container">
                    {filteredCategories.map((item, i) => {
                return (
                        <Link className="category" to={`/kategorier/${item.id}/traeninger`} key={i} >
                            <Button className="item" value={item.title}></Button>
                            <div className=""></div>
                        </Link>
                         );
                    
                    })}
                    </div>

                </div>
                   
           
            </div>
        </div> : <Loader/>
    )
}


export default CategoryList;