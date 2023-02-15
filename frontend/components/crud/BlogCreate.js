import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill= dynamic(()=> import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill'

const CreateBlog =( {router} ) => {
    const blogFromLS = () => {
        if(typeof window === 'undefined') {
            return false
        }

        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            return false;
        }
    }

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags


    const[body, setBody] = useState(blogFromLS())
    const[values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const { error, sizeError, success, formData, title, hidePublishButton } = values; 
    const token = getCookie('token') 

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories()
        initTags()
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data)
            }
        })
    }

    const publishBlog = (e) => {
        e.preventDefault()
        // console.log('ready to publish Blog')
        createBlog(formData, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', error: '', success: `A new Blog titled "${data.title}" is created` })
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    }

    const handleChange = name => event => {
        // console.log(event.target.value);
        const value = name === 'photo' ? event.target.files[0]: event.target.value 
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''});
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e)
        formData.set('body', e)
        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleToggle = c => () => {
        setValues({...values, error: ''})
        // return 1st index or -1
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]

        if(clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        setChecked(all);
        formData.set('categories', all);
    }

    const handleTagsToggle = t => () => {
        setValues({...values, error: ''})
        // return 1st index or -1
        const clickedTag = checkedTag.indexOf(t)
        const all = [...checkedTag]

        if(clickedTag === -1) {
            all.push(t)
        } else {
            all.splice(clickedTag, 1)
        }
        setCheckedTag(all);
        formData.set('tags', all);
        console.log(tags)
    }

    const showCategories = () => {
        return(
            categories && categories.map((c,i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="me-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return(
            tags && tags.map((t,i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="me-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>{success}</div>
        )

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted my-2">Title</label> <br/>
                    <input type="text" className="form_control my-3" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill 
                        modules={QuillModules} 
                        formats={QuillFormats}
                        value={body} 
                        placeholder="Write something amazing here ..." 
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button className="btn btn-primary my-3" type="submit">
                        Publish
                    </button>
                </div>
            </form>
        )
    }

    return (
    <div className="container-fluid py-3">
        <div className="row">
            <div className="col-md-8">
                {createBlogForm()}
                <div>
                    {showError()}
                    {showSuccess()}
                </div>
                
            </div>
            <div className="col-md-4">
            <div>
                <div className="form-group pb-2">
                    <h5>Featured Image</h5>
                    <hr />

                    <small className="text-muted"> Max-size: 1mb</small>
                    <br />
                    <label className="btn btn-outline-info">
                        Upload featured image
                        <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
                </div>
            </div>
                <h5 className="my-3">Categories</h5>
                <hr />
                <ul style={{ maxHeight: '200px', overflow: 'scroll' }}>{showCategories()}</ul>
                <h5 className="my-3">Tags</h5>
                <hr />
                <ul style={{ maxHeight: '200px', overflow: 'scroll' }}>{showTags()}</ul>
                <hr />

            </div>
        </div>
    </div>
    );
};

export default withRouter(CreateBlog);
