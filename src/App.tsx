import React, { useState } from 'react';
import {
  Home,
  Book,
  Wallet,
  Users,
  BarChart,
  Plus,
  ArrowRight,
  Moon,
  Sun,
  Speaker,
  PiggyBank,
  TrendingUp,
  Play,
  Award,
  Target
} from 'lucide-react';

const MobileApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [balance, setBalance] = useState(12500);
  const [recentActivities, setRecentActivities] = useState([
    { type: 'credit', amount: 500, desc: 'Saved Money', time: 'Today, 2:30 PM' },
    { type: 'debit', amount: 200, desc: 'Sent to Group', time: 'Today, 1:15 PM' },
    { type: 'credit', amount: 1000, desc: 'Added Money', time: 'Yesterday, 4:45 PM' },
  ]);
  const [learningProgress, setLearningProgress] = useState({
    completedLessons: 4,
    totalLessons: 12,
    modules: [
      { title: 'Basic Banking', desc: 'Learn about savings accounts', progress: 75 },
      { title: 'Smart Saving', desc: 'Tips for saving money', progress: 50 },
      { title: 'Safe Investing', desc: 'Introduction to investments', progress: 25 },
    ]
  });
  const [savingsGoals, setSavingsGoals] = useState([
    { title: 'Emergency Fund', target: 25000, current: 15000 },
    { title: 'Children Education', target: 50000, current: 20000 }
  ]);
  const [groupActivities, setGroupActivities] = useState([
    { title: 'Weekly Meeting', time: 'Sunday, 10:00 AM', members: '12/15', attending: false },
    { title: 'Savings Collection', time: 'Wednesday, 4:00 PM', members: '10/15', attending: true },
    { title: 'Financial Training', time: 'Saturday, 11:00 AM', members: '8/15', attending: false }
  ]);

  const handleAddMoney = () => {
    const amount = 500; // In a real app, this would be from user input
    setBalance(prev => prev + amount);
    setRecentActivities(prev => [{
      type: 'credit',
      amount: amount,
      desc: 'Added Money',
      time: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  const handleSendMoney = () => {
    const amount = 200; // In a real app, this would be from user input
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setRecentActivities(prev => [{
        type: 'debit',
        amount: amount,
        desc: 'Sent Money',
        time: new Date().toLocaleTimeString()
      }, ...prev]);
    }
  };

  const handleStartLesson = (moduleIndex: number) => {
    const updatedModules = [...learningProgress.modules];
    if (updatedModules[moduleIndex].progress < 100) {
      updatedModules[moduleIndex].progress += 25;
      setLearningProgress(prev => ({
        ...prev,
        modules: updatedModules,
        completedLessons: prev.completedLessons + (updatedModules[moduleIndex].progress === 100 ? 1 : 0)
      }));
    }
  };

  const handleContributeToGoal = (goalIndex: number) => {
    const contribution = 1000; // In a real app, this would be from user input
    if (balance >= contribution) {
      setBalance(prev => prev - contribution);
      const updatedGoals = [...savingsGoals];
      updatedGoals[goalIndex].current += contribution;
      setSavingsGoals(updatedGoals);
      setRecentActivities(prev => [{
        type: 'debit',
        amount: contribution,
        desc: `Contributed to ${savingsGoals[goalIndex].title}`,
        time: new Date().toLocaleTimeString()
      }, ...prev]);
    }
  };

  const toggleActivityAttendance = (index: number) => {
    const updatedActivities = [...groupActivities];
    updatedActivities[index].attending = !updatedActivities[index].attending;
    setGroupActivities(updatedActivities);
  };

  const screens = {
    home: (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop" 
              alt="profile" 
              className="rounded-full border-2 border-blue-400 w-12 h-12 object-cover"
            />
            <div>
              <div className="text-xl font-bold">Lakshmi</div>
              <div className="text-sm text-gray-600">गाँव: Puri</div>
            </div>
          </div>
          <button 
            className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            onClick={() => alert('Voice assistance activated')}
          >
            <Speaker size={24} className="text-blue-600" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="text-center space-y-2">
            <div className="text-sm opacity-90">आपका बैलेंस</div>
            <div className="text-3xl font-bold">₹{balance.toLocaleString()}</div>
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={handleAddMoney}
                className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <Plus size={20} />
                <span>Add</span>
              </button>
              <button 
                onClick={handleSendMoney}
                className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowRight size={20} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="text-lg font-semibold px-1">Recent Activity</div>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${activity.type === 'credit' ? 'bg-green-100' : 'bg-red-100'} rounded-full`}>
                    <PiggyBank size={24} className={activity.type === 'credit' ? 'text-green-600' : 'text-red-600'} />
                  </div>
                  <div>
                    <div className="font-medium">{activity.desc}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
                <div className={`font-semibold ${activity.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {activity.type === 'credit' ? '+' : '-'}₹{activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    learn: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Learning Hub</h2>
        
        {/* Progress Bar */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Your Progress</span>
            <span className="text-blue-600">
              {learningProgress.completedLessons}/{learningProgress.totalLessons} Lessons
            </span>
          </div>
          <div className="h-2 bg-blue-200 rounded">
            <div 
              className="h-full bg-blue-600 rounded transition-all duration-300"
              style={{
                width: `${(learningProgress.completedLessons / learningProgress.totalLessons) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Learning Modules */}
        {learningProgress.modules.map((module, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Book size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.desc}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-blue-500 rounded transition-all duration-300"
                        style={{width: `${module.progress}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{module.progress}%</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleStartLesson(index)}
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                disabled={module.progress === 100}
              >
                <Play size={20} className="text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ),

    money: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Money Management</h2>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Plus size={32} />, label: 'Add Money', color: 'bg-green-100', action: handleAddMoney },
            { icon: <ArrowRight size={32} />, label: 'Send Money', color: 'bg-blue-100', action: handleSendMoney },
            { icon: <PiggyBank size={32} />, label: 'Save', color: 'bg-purple-100', action: () => setActiveScreen('group') },
            { icon: <TrendingUp size={32} />, label: 'Invest', color: 'bg-yellow-100', action: () => alert('Investment feature coming soon!') }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={action.action}
              className={`${action.color} p-6 rounded-xl flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Savings Goals */}
        <div className="space-y-4">
          <h3 className="font-semibold">Savings Goals</h3>
          {savingsGoals.map((goal, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{goal.title}</span>
                <span className="text-blue-600">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-blue-100 rounded mb-2">
                <div 
                  className="h-full bg-blue-600 rounded transition-all duration-300"
                  style={{width: `${(goal.current / goal.target) * 100}%`}}
                ></div>
              </div>
              <button
                onClick={() => handleContributeToGoal(index)}
                className="w-full mt-2 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Contribute
              </button>
            </div>
          ))}
        </div>
      </div>
    ),

    group: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Community Groups</h2>

        {/* Group Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm">Active Members</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">₹24,000</div>
            <div className="text-sm">Group Savings</div>
          </div>
        </div>

        {/* Group Activities */}
        <div className="space-y-4">
          <h3 className="font-semibold">Group Activities</h3>
          {groupActivities.map((activity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-gray-600">{activity.time}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span className="text-sm">{activity.members}</span>
                  </div>
                  <button
                    onClick={() => toggleActivityAttendance(index)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activity.attending 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activity.attending ? 'Attending' : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    progress: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Progress</h2>

        {/* Achievement Stats */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl text-white">
          <div className="text-center">
            <Award size={48} className="mx-auto mb-2" />
            <div className="text-lg">Financial Health Score</div>
            <div className="text-3xl font-bold">78/100</div>
          </div>
        </div>

        {/* Progress Categories */}
        {[
          { title: 'Savings Habit', score: 85, icon: <PiggyBank /> },
          { title: 'Learning Progress', score: 70, icon: <Book /> },
          { title: 'Regular Income', score: 90, icon: <TrendingUp /> },
          { title: 'Goal Achievement', score: 65, icon: <Target /> }
        ].map((category, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded">
                  {category.icon}
                </div>
                <span className="font-medium">{category.title}</span>
              </div>
              <span className="text-blue-600 font-semibold">{category.score}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded">
              <div 
                className="h-full bg-blue-600 rounded transition-all duration-300"
                style={{width: `${category.score}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:opacity-80 transition-opacity`}
        >
          {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24">
        {screens[activeScreen]}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-md mx-auto flex justify-around p-4">
          {[
            { icon: <Home size={24} />, label: 'Home', screen: 'home' },
            { icon: <Book size={24} />, label: 'Learn', screen: 'learn' },
            { icon: <Wallet size={24} />, label: 'Money', screen: 'money' },
            { icon: <Users size={24} />, label: 'Group', screen: 'group' },
            { icon: <BarChart size={24} />, label: 'Progress', screen: 'progress' }
          ].map((item) => (
            <button 
              key={item.screen}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeScreen === item.screen 
                  ? 'text-blue-600' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
              onClick={() => setActiveScreen(item.screen)}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileApp;