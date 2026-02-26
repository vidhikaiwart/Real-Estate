const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        {Icon && (
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="text-3xl font-semibold text-gray-900 mb-2">{value}</div>
      {trend && <div className="text-sm text-gray-600">{trend}</div>}
    </div>
  )
}

export default StatCard
