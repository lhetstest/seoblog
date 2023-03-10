import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="row p-3">
                    <div className="col-md-12 pt-4 pb-5"><h2>Admin Dashboard</h2></div>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">Create categories and tags</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/admin/crud/blog">Create Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8">right</div>
                </div>
            </Admin>
        </Layout>
        );
};

export default AdminIndex;