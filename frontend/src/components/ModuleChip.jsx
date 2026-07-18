export default function ModuleChip({ module }) {
  return (
    <div className={`module-chip ${module.is_core ? "module-chip--core" : ""}`}>
      <span className="module-chip__code">{module.short_code || "MOD"}</span>
      <div className="module-chip__body">
        <span className="module-chip__name">{module.name}</span>
        {module.short_description && (
          <span className="module-chip__desc">{module.short_description}</span>
        )}
      </div>
      {module.is_addon && <span className="module-chip__addon">Add-on</span>}
    </div>
  );
}
