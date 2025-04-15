import React, { useState } from 'react';
import styles from '../styles/sideBar.module.css';
import { MessageSquare, Plus, PanelLeft, PanelRight } from "lucide-react"

interface SidebarProps {
  className?: string
}

function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`${styles.sidebarContainer} ${className || ""}`}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>
        <div className={styles.sidebarHeader}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={styles.toggleButton}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
          </button>
          {!collapsed && (
            <button className={styles.chatButton}>
              <MessageSquare size={20} />
              <span>New Chat</span>
            </button>
          )}
        </div>
        <div className={styles.sidebarContent}>
          <button className={styles.createButton}>
            Create new lesson
            <Plus size={20} />
          </button>
        </div>
        <div className={styles.sidebarBody}>{/* Sidebar content would go here */}</div>
      </aside>
    </div>
  )
}

export default Sidebar;
