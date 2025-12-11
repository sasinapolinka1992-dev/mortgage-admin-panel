import React from 'react';
import { Edit2, Trash2, Layers, AlertCircle, Zap } from 'lucide-react';
import { Bank } from '../src/types';
import { Button } from './ui/Button';
import { Switch } from './ui/Switch';

interface BankTableProps {
  banks: Bank[];
  onEdit: (bank: Bank) => void;
  onDelete: (bank: Bank) => void;
  onToggleStatus: (bank: Bank, status: boolean) => void;
  onAddProgram: (bank: Bank) => void;
}

export const BankTable: React.FC<BankTableProps> = ({ 
  banks, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onAddProgram 
}) => {
  // Состояние разворачивания убрано, так как детали теперь видны сразу

  if (banks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Layers className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Банки не найдены</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Список банков пуст. Добавьте новый банк, чтобы начать работу с калькулятором.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
              <th className="px-6 py-4 font-semibold w-1/4">Банк</th>
              <th className="px-6 py-4 font-semibold w-2/5">Ипотечные программы</th>
              <th className="px-6 py-4 font-semibold text-center w-1/12">Статус</th>
              <th className="px-6 py-4 font-semibold text-right w-1/6">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banks.map((bank) => (
              <tr key={bank.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 align-top">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 p-1.5 flex-shrink-0 relative">
                      {bank.logo ? <img src={bank.logo} className="w-full h-full object-contain" alt="" /> : <div className="w-full h-full bg-gray-100 rounded" />}
                      {bank.autoRates && (
                        <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white" title="Автоставки банка">
                          <Zap size={10} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-base">
                        {bank.name}
                      </div>
                      {bank.description && <div className="text-xs text-gray-500 line-clamp-2 mt-1">{bank.description}</div>}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 align-top">
                  {bank.programs.length > 0 ? (
                    <div className="space-y-3">
                      {bank.programs.map((prog) => (
                        <div key={prog.id} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm p-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors">
                            <div className="font-medium text-gray-800 min-w-[140px]">
                                {prog.name}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 text-xs sm:text-sm">
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                                    {prog.rate}%
                                </span>
                                <span title="Первоначальный взнос" className="whitespace-nowrap">
                                    ПВ: {prog.minDownPayment}%
                                </span>
                                <span title="Срок кредитования" className="whitespace-nowrap">
                                    {prog.minTerm}-{prog.maxTerm} лет
                                </span>
                            </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400 text-sm italic py-2">
                      <AlertCircle size={16} />
                      Нет активных программ
                      <Button size="sm" variant="ghost" className="text-primary h-auto p-0 hover:bg-transparent ml-2 font-normal" onClick={() => onAddProgram(bank)}>
                        Добавить
                      </Button>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 text-center align-top pt-8">
                  <div className="flex justify-center">
                    <Switch checked={bank.isActive} onChange={(val) => onToggleStatus(bank, val)} />
                  </div>
                </td>
                
                <td className="px-6 py-4 text-right align-top pt-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEdit(bank)}
                      title="Редактировать банк"
                      className="text-gray-500 hover:text-primary"
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDelete(bank)}
                      title="Удалить банк"
                      className="text-gray-500 hover:text-danger"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <span className="text-sm text-gray-500">Показано {banks.length} банков</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 text-sm disabled:opacity-50" disabled>Назад</button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 text-sm disabled:opacity-50" disabled>Вперед</button>
        </div>
      </div>
    </div>
  );
};