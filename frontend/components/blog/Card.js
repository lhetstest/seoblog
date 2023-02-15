import Link from "next/link";
import { Interweave } from 'interweave';
import {API} from '../../config';
import moment from 'moment';

const Card = ({blog}) => {

    const showBlogCategories = blog => {
        return blog.categories.map((c,i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <div className="btn btn-primary mx-1 mt-3">{c.name}</div>
            </Link>
        ))
    }

    const showBlogTags = blog => {
        return blog.tags.map((t,i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <div className="btn btn-primary mx-1 mt-3">{t.name}</div>
            </Link>
        ))
    }

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <h2 className="py-3 font-weight-bold">{blog.title}</h2>
                </Link>
            </header>
            <section>
                <p className="mark ms-1 py-2">
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
            </section>
            <section>
                <div className="row">
                    <div className="col-md-4">image</div>
                    <div className="col-md-8">
                        <section>
                            <div className="pb-3">
                                <Interweave className="pb-3" content={blog.excerpt} />
                            </div>
                            <Link href={`/blogs/`}>
                                <div className="btn btn-primary ps-2">Read more</div>
                            </Link>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Card;