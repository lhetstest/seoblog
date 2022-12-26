import { useState } from 'react';
import { APP_NAME } from '../config';
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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <Navbar color="light" expand="md">
            <NavbarBrand className="font-weight-bold" href="/">{APP_NAME}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
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
                </Nav>
            </Collapse>
        </Navbar>
    </div>
        );
}

export default Header;