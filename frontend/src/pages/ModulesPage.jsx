import { useEffect, useMemo, useState } from "react";
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
        m.short_code?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [modules, activeCategory, search]);

  return (
    <>
      <section className="page-header">
        <div className="section-container">
          <span className="eyebrow">Modules</span>
          <h1 className="page-header__title">Every workflow, one platform</h1>
          <p className="page-header__subtitle">
            From SHA claims to bed boards — browse every module available
            across Medicore HMIS packages.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="modules-toolbar">
            <input
              type="search"
              className="input"
              placeholder="Search modules e.g. SHA, Pharmacy, Bed…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="modules-toolbar__filters">
              <button
                className={`filter-pill ${activeCategory === "all" ? "filter-pill--active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`filter-pill ${activeCategory === c.slug ? "filter-pill--active" : ""}`}
                  onClick={() => setActiveCategory(c.slug)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading && <p>Loading modules…</p>}
          {!isLoading && filteredModules.length === 0 && (
            <p className="empty-state">No modules match that search.</p>
          )}
          <div className="module-grid module-grid--wide">
            {filteredModules.map((m) => (
              <ModuleChip key={m.id} module={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
