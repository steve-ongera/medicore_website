import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getModules, getModuleCategories } from "../services/api.js";
import ModuleChip from "../components/ModuleChip.jsx";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getModules(), getModuleCategories()])
      .then(([modulesData, categoriesData]) => {
        if (!isMounted) return;
        setModules(modulesData);
        setCategories(categoriesData);
      })
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesCategory =
        activeCategory === "all" || m.category?.slug === activeCategory;
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.short_code?.toLowerCase().includes(search.toLowerCase()) ||
        m.short_description?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [modules, activeCategory, search]);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Modules</h1>
                <p className="mb-0">
                  Every workflow, one platform — from SHA claims to bed boards
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Modules</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Modules Section */}
      <section id="modules" className="section">
        <div className="container">
          {/* Search and Filter Toolbar */}
          <div className="row mb-4" data-aos="fade-up">
            <div className="col-lg-8 mx-auto">
              <div className="row g-3">
                {/* Search Input */}
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search modules e.g. SHA, Pharmacy, Bed Management…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setSearch('')}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter - Mobile Dropdown */}
                <div className="col-md-4 d-md-none">
                  <select 
                    className="form-select"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Filter Pills - Desktop */}
              <div className="d-none d-md-flex flex-wrap gap-2 mt-3">
                <button
                  className={`btn btn-sm ${activeCategory === "all" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className={`btn btn-sm ${activeCategory === c.slug ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveCategory(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-3 text-muted small">
                {!isLoading && (
                  <span>
                    Showing {filteredModules.length} of {modules.length} modules
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          {isLoading ? (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading modules...</span>
              </div>
              <p className="mt-3">Loading modules…</p>
            </div>
          ) : filteredModules.length === 0 ? (
            <div className="text-center py-5" data-aos="fade-up">
              <i className="bi bi-search display-1 text-muted"></i>
              <h3 className="mt-3">No modules found</h3>
              <p className="text-muted">
                Try adjusting your search or filter criteria
              </p>
              <button 
                className="btn btn-primary mt-2"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row gy-4">
              {filteredModules.map((m, index) => (
                <div 
                  key={m.id}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={100 + (index * 50)}
                >
                  <ModuleChip module={m} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}