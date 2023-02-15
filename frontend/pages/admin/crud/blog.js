import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="row p-3">
                    <div className="col-md-12 pt-4 pb-5">
                        <h2>Create a New Blog</h2>
                    </div>
                    <div className="col-md-12">
                        <BlogCreate />
                    </div>
                </div>
            </Admin>
        </Layout>
        );
};

export default Blog;