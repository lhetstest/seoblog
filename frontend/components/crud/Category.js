import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues]= useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const {name, error, success, categories, removed, reload} = values;
    const token = getCookie('token')

    useEffect(() => {
        loadCategories()
    },[reload])

    const loadCategories = () => {
        getCategories().then( data => {
            if(data.error) {
                console.log(data.error)
                // setValues({ ...values, error:data.error, success: false });
            } else {
                setValues({ ...values, categories: data });
            }
        });
    };

    const showCategories = () => {
        return categories.map((c,i) => {
            return (
                <button className="btn btn-outline-primary m-2" onDoubleClick={() => deleteConfirm(c.slug)} title='Double click to Delete' key={i} >
                    {c.name}
                </button> 
            );
        })
    };

    const deleteConfirm = slug =>{
        let answer = window.confirm('This action will remove category permanently.')
        if(answer) {
            deleteCategory(slug)
        }
    }

    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if(data.error) {
                console.log(data.error)
            }else { 
                setValues({...values, error: false, success:false, name: '', removed: !removed, reload: !reload })
            }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        // console.log('created category: ', name)
        create({name}, token).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', reload: !reload });
                console.log(values)
            }
        })
    }

    const handleChange = e => {
        setValues({...values, name: e.target.value, error:false, success: false});
    };

    const showSuccess = () => {
        if(success) {
            return <p className='text-success'>Category is created</p>
        };
    };

    const showRemoved = () => {
        if(removed) {
            return <p className='text-danger'>Category is removed</p>
        };
    };

    const showError = () => {
        if(error) {
            return <p className='text-danger'>Category already exists</p>
        };
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div className='pt-3'>
                <button type="submit" className='btn btn-primary'>
                    Create
                </button>
            </div>
        </form>
    );

    return (
    <>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        
        <div onMouseMove={mouseMoveHandler}>
            {newCategoryForm()}
            {showCategories()}
        </div>
    </>
    )
}

export default Category;