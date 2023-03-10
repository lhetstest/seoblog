import Layout from "../../components/Layout";
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import {API} from '../../config';
import Card from "../../components/blog/Card";


const Blogs = ({blogs, categories, tags, size}) => {

    const showAllBlogs = () => {
        return blogs.map((blog,i) => {
            return <article key={i}>
                <Card blog={blog}/>
                <hr />
            </article>
        })
    }
    return (
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 ps-3">
                            <h1 className="display-4 font-weight-bold text-center">
                                Security Blogs and Tutor
                            </h1>
                        </div>
                        <section>
                            <p>show categories and tags</p>
                        </section>
                    </header>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">{showAllBlogs()}</div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

Blogs.getInitialProps = () => {
    return listBlogsWithCategoriesAndTags().then(data => {
        if(data.error){
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs, 
                categories: data.categories, 
                tags: data.tags,
                size: data.size
            };
        }
    })
}

export default Blogs; // get InitialProps