import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { endpoints } from "@/lib/api";
import { toast } from "sonner";
import { RequireAuth } from "@/components/RequireAuth";

export const Route = createFileRoute("/account/profile")({
  component: () => <RequireAuth><Profile /></RequireAuth>,
});

function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setOtpEmail(user.email || "");
  }, [user]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const u = await endpoints.updateProfile({ name, email, phone });
      setUser(u);
      toast.success("Profile updated");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const { url } = await endpoints.uploadAvatar(f);
      const u = await endpoints.updateProfile({ avatar: url });
      setUser(u);
      toast.success("Avatar updated");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function sendOtp() {
    setPwBusy(true);
    try {
      await endpoints.requestPasswordOtp({ email: otpEmail });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setPwBusy(false);
    }
  }
  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setPwBusy(true);
    try {
      await endpoints.verifyPasswordOtp({ email: otpEmail, otp, newPassword: newPass });
      toast.success("Password changed");
      setOtp(""); setNewPass(""); setOtpSent(false);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setPwBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Panel title="Profile">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-bg-light overflow-hidden border border-white/80">
            {user?.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full grid place-items-center text-navy font-bold">{(user?.name || "?").charAt(0)}</div>}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onAvatar} className="hidden" />
            <Btn variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? "Uploading…" : "Change photo"}
            </Btn>
          </div>
        </div>
        <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
          <F l="Full name" value={name} onChange={setName} />
          <F l="Email" value={email} onChange={setEmail} type="email" />
          <F l="Phone" value={phone} onChange={setPhone} />
          <div className="md:col-span-2 mt-2"><Btn disabled={saving}>{saving ? "Saving…" : "Save changes"}</Btn></div>
        </form>
      </Panel>

      <Panel title="Change password (OTP)">
        {!otpSent ? (
          <div className="space-y-3">
            <F l="Email" value={otpEmail} onChange={setOtpEmail} type="email" />
            <Btn onClick={sendOtp} disabled={pwBusy || !otpEmail}>{pwBusy ? "Sending…" : "Send OTP"}</Btn>
          </div>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-3">
            <F l="OTP code" value={otp} onChange={setOtp} />
            <F l="New password" value={newPass} onChange={setNewPass} type="password" />
            <div className="flex gap-2">
              <Btn disabled={pwBusy || !otp || !newPass}>{pwBusy ? "Updating…" : "Update password"}</Btn>
              <Btn variant="ghost" onClick={() => setOtpSent(false)}>Cancel</Btn>
            </div>
          </form>
        )}
      </Panel>
    </div>
  );
}

function F({ l, value, onChange, type = "text" }: { l: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest text-text-muted uppercase">{l}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} type={type} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue" />
    </div>
  );
}
