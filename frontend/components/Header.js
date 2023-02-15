import { useState, useEffect } from 'react';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import NProgress from 'nprogress';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


const TopProgressBar = () => {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        NProgress.start()

        return () => {
            NProgress.done();
        };
    }, []);

    return "";
}


// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <TopProgressBar/>
            <Navbar color="light" expand="md">
            <NavbarBrand className="font-weight-bold" href="/">{APP_NAME}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink href="https://github.com/lhetstest">
                        GitHub
                    </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Services
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem>Courses</DropdownItem>
                            <DropdownItem>Consulting</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Reset</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                        <NavItem>
                            <NavLink href="/blogs">
                                Blogs
                            </NavLink>
                        </NavItem>
                        

                    {!isAuth() && 
                    <>
                        <NavItem>
                            <NavLink href="/signin">
                                Signin
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/signup">
                                Signup
                            </NavLink>
                        </NavItem>
                    </>
                    }

                    {isAuth() && isAuth().role === 0 && (
                        <NavItem>
                            <NavLink href='/user'>
                                {`${isAuth().name}'s Dashboard`}
                            </NavLink>
                        </NavItem>
                    )}

                    {isAuth() && isAuth().role === 1 && (
                        <NavItem>
                            <NavLink href='/admin'>
                                {`${isAuth().name}'s Dashboard`}
                            </NavLink>
                        </NavItem>
                    )}

                    {isAuth() && (
                        <NavItem>
                            <NavLink style={{ cursor: 'pointer' }} onClick={()=> signout(() => Router.replace(`/signin`))}>
                                Signout
                            </NavLink>
                        </NavItem>
                    )}
                    
                    

                    
                </Nav>
            </Collapse>
        </Navbar>
    </div>
        );
}

export default Header;