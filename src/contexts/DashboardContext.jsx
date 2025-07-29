import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateId } from '../lib/utils';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const initialState = {
  widgets: [],
  layout: [],
  selectedWidget: null,
  isEditing: false,
  showWelcome: true,
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    
    case 'ADD_WIDGET':
      const newWidget = {
        id: generateId(),
        type: action.payload.type,
        title: action.payload.title || `New ${action.payload.type}`,
        config: action.payload.config || {},
        ...action.payload
      };
      return {
        ...state,
        widgets: [...state.widgets, newWidget],
        layout: [...state.layout, {
          i: newWidget.id,
          x: 0,
          y: 0,
          w: action.payload.defaultWidth || 4,
          h: action.payload.defaultHeight || 3,
        }]
      };
    
    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(w => w.id !== action.payload),
        layout: state.layout.filter(l => l.i !== action.payload),
        selectedWidget: state.selectedWidget === action.payload ? null : state.selectedWidget
      };
    
    case 'UPDATE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.map(w =>
          w.id === action.payload.id ? { ...w, ...action.payload.updates } : w
        )
      };
    
    case 'UPDATE_LAYOUT':
      return {
        ...state,
        layout: action.payload
      };
    
    case 'SELECT_WIDGET':
      return {
        ...state,
        selectedWidget: action.payload
      };
    
    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload
      };
    
    case 'HIDE_WELCOME':
      return {
        ...state,
        showWelcome: false
      };
    
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-state');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load dashboard state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      widgets: state.widgets,
      layout: state.layout,
      showWelcome: state.showWelcome,
    };
    localStorage.setItem('dashboard-state', JSON.stringify(stateToSave));
  }, [state.widgets, state.layout, state.showWelcome]);

  const value = {
    ...state,
    dispatch,
    addWidget: (widget) => dispatch({ type: 'ADD_WIDGET', payload: widget }),
    removeWidget: (id) => dispatch({ type: 'REMOVE_WIDGET', payload: id }),
    updateWidget: (id, updates) => dispatch({ type: 'UPDATE_WIDGET', payload: { id, updates } }),
    updateLayout: (layout) => dispatch({ type: 'UPDATE_LAYOUT', payload: layout }),
    selectWidget: (id) => dispatch({ type: 'SELECT_WIDGET', payload: id }),
    setEditing: (editing) => dispatch({ type: 'SET_EDITING', payload: editing }),
    hideWelcome: () => dispatch({ type: 'HIDE_WELCOME' }),
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
