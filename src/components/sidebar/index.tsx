import { me } from "@/api/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { File, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarFooterMenu from "./footer";
import { DashboardButton } from "./ui";

import logo from "@/assets/images/logo.png";

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="py-2">
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <DashboardSidebarFooter />
    </Sidebar>
  );
}

function DashboardSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="gap-0" asChild>
            <Link href="/">
              <div className="flex size-8 items-center justify-center">
                <Image src={logo} alt="Logo" width={16} height={16} />
              </div>
              <div className="grid flex-1 truncate text-left leading-tight">
                <p className="pl-2 text-sm font-bold">Smart Vault</p>
                <p className="pl-2 text-xs text-muted-foreground">
                  Панель администратора
                </p>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

function DashboardSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <DashboardButton icon={<File />} title="Файлы" link="/files" exact />
          <DashboardButton
            icon={<MessageCircle />}
            title="Чаты"
            link="/chats"
          />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

async function DashboardSidebarFooter() {
  const user = await me();
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarFooterMenu user={user} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
