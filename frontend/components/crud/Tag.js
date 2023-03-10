import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues]= useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const {name, error, success, tags, removed, reload} = values;
    const token = getCookie('token')

    useEffect(() => {
        loadTags()
    },[reload])

    const loadTags = () => {
        getTags().then( data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = () => {
        return tags.map((t,i) => {
            return (
                <button 
                    className="btn 
                    btn-outline-primary m-2" 
                    onDoubleClick={() => deleteConfirm(t.slug)} 
                    title='Double click to Delete' key={i} 
                >
                    {t.name}
                </button> 
            );
        })
    };

    const deleteConfirm = slug =>{
        let answer = window.confirm('This action will remove tag permanently.')
        if(answer) {
            deleteTag(slug)
        }
    }

    const deleteTag = slug => {
        removeTag(slug, token).then(data => {
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
            }
        });
    };

    const handleChange = e => {
        setValues({...values, name: e.target.value, error:false, success: false});
    };

    const showSuccess = () => {
        if(success) {
            return <p className='text-success'>Tag is created</p>
        };
    };

    const showRemoved = () => {
        if(removed) {
            return <p className='text-danger'>Tag is removed</p>
        };
    };

    const showError = () => {
        if(error) {
            return <p className='text-danger'>Tag already exists</p>
        };
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' })
    }

    const newTagForm = () => (
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
            {newTagForm()}
            {showTags()}
        </div>
    </>
    )
}

export default Tag;