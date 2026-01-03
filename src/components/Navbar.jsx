import '../styles/Navbar.css';

const Navbar = ({
    role,
    onLogout,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    parkingFilter,
    setParkingFilter,
    searchInputRef
}) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>🍽️ Restaurant Manager</h1>
                <span className="role-badge">{role === 'admin' ? 'Admin' : 'Customer'}</span>
            </div>

            <div className="navbar-controls">
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="🔍 Search by name or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Filters */}
                <div className="filters">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Types</option>
                        <option value="Rajasthani">Rajasthani</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Mughlai">Mughlai</option>
                        <option value="Jain">Jain</option>
                        <option value="Thai">Thai</option>
                        <option value="North Indian">North Indian</option>
                        <option value="South Indian">South Indian</option>
                    </select>

                    <select
                        value={parkingFilter}
                        onChange={(e) => setParkingFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Parking</option>
                        <option value="true">With Parking</option>
                        <option value="false">No Parking</option>
                    </select>
                </div>

                <button onClick={onLogout} className="logout-btn">
                    🚪 Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
