// biz-web-app/components/SubscriptionPlan/PricingCard.jsx

export default function PricingCard({ plan, onSelect }) {
  return (
    <div className="border rounded-3xl mt-2 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <button
          onClick={onSelect}
          className="p-2 rounded-full  bg-black text-white dark:bg-white dark:text-black"
        >
          Get started
        </button>
      </div>
      <p className="text-sm mt-2">{plan.users} Users</p>
      <p className="mt-2 text-2xl font-bold">{plan.price}</p>
      {plan.features && plan.features.length > 0 && (
        <ul className="mt-4 space-y-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-xs">
              - {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
